import algodrill/api
import algodrill/browser
import algodrill/editor
import algodrill/insights
import algodrill/keys
import algodrill/legacy
import algodrill/local
import algodrill/model.{
  type Model, type Msg, Account, AuthCompleted, AuthForm, AuthRoute,
  AwaitingGrade, CardSuspended, DayStartHour, DesiredRetention, DraftSaveTicked,
  DraftSynced, DrillRoute, EditorChanged, EditorFocusRequested, ExamSampled,
  ExitConfirmed, Guest, HelpToggled, HistoryLoaded, InsightsLoaded, KeyPressed,
  MenuActivated, MenuCursorJumped, MenuCursorMoved, MenuPaneFocused, MenuRoute,
  MenuSuspendedAtCursor, MenuToggledAtCursor, Model, NewPerDay, NotGrading,
  NotStarted, PickerConfirmed, PickerRoute, PickerToggledLanguage,
  PromptDismissed, QuizMoved, Ran, Registering, ReportRoute, ReviewRecorded,
  ReviewsPerDay, RunFinished, RunIdle, RunTimedOut, RunnerFailed, RunnerReady,
  Running, RuntimeFailed, RuntimeLoadTimedOut, RuntimeLoading, RuntimeNotLoaded,
  RuntimeReady, SearchFocusRequested, SettingsRoute, SettingsSaved,
  SignOutCompleted, SigningIn, StateImported, StateLoaded, StatsActivated,
  StatsCursorMoved, StatsLoaded, StatsRoute, StudyRoute, SubmittingGrade,
  SummaryRoute, SyncFailed, Synced, Syncing, TimedOut, UserChangedAuthEmail,
  UserChangedAuthPassword, UserChangedIterations, UserChangedKeymap,
  UserChangedSetting, UserClickedBackToStudy, UserClickedBreadcrumb,
  UserClickedBrowse, UserClickedCategory, UserClickedClearSelection,
  UserClickedDeviceTimezone, UserClickedExitDrill, UserClickedExitReport,
  UserClickedMergeGuest, UserClickedNext, UserClickedRetryRuntime,
  UserClickedRun, UserClickedSelectAll, UserClickedSettings, UserClickedSignIn,
  UserClickedSignOut, UserClickedStartDrill, UserClickedStartExam,
  UserClickedStats, UserClickedStopRun, UserClickedStudy, UserClickedSubcategory,
  UserClosedDetail, UserDismissedNotice, UserDismissedUpgradePrompt, UserGraded,
  UserOpenedDetail, UserPickedChoice, UserRevealedHint, UserSearched,
  UserSubmittedAnswer, UserSubmittedAuth, UserToggledAuthMode,
  UserToggledLanguage, UserToggledProblem, UserToggledSide, UserToggledSolution,
  UserToggledSuspend,
}
import algodrill/problem.{type ProblemRef}
import algodrill/problems
import algodrill/queue
import algodrill/runner
import algodrill/session
import algodrill/store
import algodrill/view/auth
import algodrill/view/drill
import algodrill/view/help
import algodrill/view/menu
import algodrill/view/picker
import algodrill/view/report
import algodrill/view/settings
import algodrill/view/stats
import algodrill/view/statusbar
import algodrill/view/study
import algodrill/view/summary
import fsrs
import gleam/dict
import gleam/float
import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/string
import lustre
import lustre/effect.{type Effect}
import lustre/element.{type Element}
import wire.{ProblemRef}

pub fn main() {
  editor.register()
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}

fn init(_flags) -> #(Model, Effect(Msg)) {
  let preferences = session.load_preferences()
  let base = model.default()
  let m =
    Model(
      ..base,
      editor_keymap: preferences.editor_keymap,
      side_collapsed: preferences.side_collapsed,
      muted_languages: preferences.muted_languages,
      languages_chosen: preferences.languages_chosen,
    )

  case session.load_token() {
    // Signed in: study state lives on the server, so there is nothing to
    // restore from disk and we block on fetching it.
    Some(token) -> {
      let m = Model(..m, mode: Account(token), boot: Syncing)
      #(m, effect.batch([keyboard_effect(), store.load_state(m)]))
    }
    // No account. The app is fully usable anyway -- guest progress lives in
    // this browser. A pre-account `algoDrillState` blob is folded in here, so
    // a returning user keeps their work without being made to sign up first.
    None -> {
      let m = Model(..m, mode: Guest, boot: Syncing)
      #(
        m,
        effect.batch([keyboard_effect(), adopt_legacy(), store.load_state(m)]),
      )
    }
  }
}

/// Seeds the guest store from the pre-account localStorage format, once.
///
/// Solved problems become review cards with the memory state a `Good` first
/// answer earns -- the same seed the server uses for this migration, because
/// the old format recorded a sticky boolean and no dates at all.
fn adopt_legacy() -> Effect(Msg) {
  case legacy.pending() {
    None -> effect.none()
    Some(old) ->
      case legacy.is_empty(old) {
        True -> legacy.mark_imported()
        False -> {
          use _dispatch <- effect.from
          local.seed_from_legacy(old.solved, old.drafts)
          Nil
        }
      }
  }
}

/// Raises the stronger upgrade prompt once a guest has enough at stake for
/// the warning to mean something. Escalating with stake is honest; nagging
/// from review one is noise.
///
/// A prompt already dismissed stays dismissed -- `local.prompt_state` reads the
/// persisted flag, so it does not reappear on the next reload.
fn escalate(m: Model) -> model.UpgradePrompt {
  case m.mode, m.upgrade_prompt {
    Guest, PromptDismissed -> PromptDismissed
    Guest, _ -> local.prompt_state(local.current_day(m.settings))
    _, current -> current
  }
}

fn local_dismiss_prompt() -> Effect(Msg) {
  use _dispatch <- effect.from
  let _ = local.dismiss_prompt()
  Nil
}

/// The rows the keyboard cursor can sit on in a pane, as toggle targets.
type PaneRows {
  /// Language and subcategory rows *choose*; the payload is what clicking
  /// them would dispatch.
  ChoiceRows(List(Msg))
  /// Problem and Selected rows *toggle* a ProblemRef.
  ToggleRows(List(ProblemRef))
}

fn pane_rows(m: Model, pane: model.MenuPane) -> PaneRows {
  case pane {
    model.LanguagesPane ->
      ChoiceRows(
        problems.language_entries()
        |> list.map(fn(entry) { UserClickedCategory(entry.1) }),
      )
    model.SubcategoriesPane ->
      ChoiceRows(case m.selected_category {
        Some(category) ->
          problems.subcategory_names(category)
          |> list.map(UserClickedSubcategory)
        None -> []
      })
    model.ProblemsPane ->
      ToggleRows(case m.selected_category, m.selected_subcategory {
        Some(category), Some(subcategory) ->
          problems.problems_in(category, subcategory)
          |> list.map(fn(found) {
            ProblemRef(category, subcategory, found.title)
          })
        _, _ -> []
      })
    model.SelectedPane -> ToggleRows(m.selected)
  }
}

fn rows_length(rows: PaneRows) -> Int {
  case rows {
    ChoiceRows(msgs) -> list.length(msgs)
    ToggleRows(refs) -> list.length(refs)
  }
}

/// The cursor index for a pane, clamped into the pane's current list — lists
/// change under the cursor (switching language shrinks the problem list), and
/// clamping on read beats chasing every mutation site.
pub fn cursor_in(m: Model, pane: model.MenuPane) -> Int {
  let raw = case pane {
    model.LanguagesPane -> m.nav.language
    model.SubcategoriesPane -> m.nav.subcategory
    model.ProblemsPane -> m.nav.problem
    model.SelectedPane -> m.nav.selected
  }
  int.clamp(raw, 0, int.max(0, rows_length(pane_rows(m, pane)) - 1))
}

fn set_cursor(m: Model, pane: model.MenuPane, index: Int) -> Model {
  let nav = case pane {
    model.LanguagesPane -> model.MenuNav(..m.nav, language: index)
    model.SubcategoriesPane -> model.MenuNav(..m.nav, subcategory: index)
    model.ProblemsPane -> model.MenuNav(..m.nav, problem: index)
    model.SelectedPane -> model.MenuNav(..m.nav, selected: index)
  }
  Model(..m, nav: nav)
}

fn searching(m: Model) -> Bool {
  string.trim(m.search) != ""
}

fn move_cursor(m: Model, next: fn(Int, Int) -> Int) -> #(Model, Effect(Msg)) {
  case searching(m) {
    True -> {
      let hits = problems.search_refs(string.trim(m.search))
      let last = int.max(0, list.length(hits) - 1)
      let index = next(int.clamp(m.nav.search, 0, last), last)
      #(
        Model(..m, nav: model.MenuNav(..m.nav, search: index)),
        scroll_to("hit-" <> int.to_string(index)),
      )
    }
    False -> {
      let pane = m.nav.focus
      let last = int.max(0, rows_length(pane_rows(m, pane)) - 1)
      let index = next(cursor_in(m, pane), last)
      #(set_cursor(m, pane, index), scroll_to(row_id(pane, index)))
    }
  }
}

/// h/l between panes. Moving right through an unmade choice makes it: `l` on a
/// language selects that language and lands in its subcategories, which is how
/// a TUI drills down.
fn focus_pane(m: Model, direction: Int) -> #(Model, Effect(Msg)) {
  let order = [
    model.LanguagesPane,
    model.SubcategoriesPane,
    model.ProblemsPane,
    model.SelectedPane,
  ]
  let position =
    list.fold(list.index_map(order, fn(p, i) { #(p, i) }), 0, fn(acc, pair) {
      case pair.0 == m.nav.focus {
        True -> pair.1
        False -> acc
      }
    })
  let target = int.clamp(position + direction, 0, 3)

  case direction > 0, m.nav.focus {
    // Descending picks the cursor row if that level has no pick yet.
    True, model.LanguagesPane ->
      case m.selected_category {
        None -> {
          let #(chosen, fx) = activate_cursor(m)
          #(
            Model(
              ..chosen,
              nav: model.MenuNav(..chosen.nav, focus: model.SubcategoriesPane),
            ),
            fx,
          )
        }
        Some(_) -> #(
          Model(
            ..m,
            nav: model.MenuNav(..m.nav, focus: model.SubcategoriesPane),
          ),
          effect.none(),
        )
      }
    True, model.SubcategoriesPane ->
      case m.selected_subcategory {
        None -> {
          let #(chosen, fx) = activate_cursor(m)
          #(
            Model(
              ..chosen,
              nav: model.MenuNav(..chosen.nav, focus: model.ProblemsPane),
            ),
            fx,
          )
        }
        Some(_) -> #(
          Model(..m, nav: model.MenuNav(..m.nav, focus: model.ProblemsPane)),
          effect.none(),
        )
      }
    _, _ -> {
      let focus = case list.drop(order, target) {
        [pane, ..] -> pane
        [] -> model.LanguagesPane
      }
      #(Model(..m, nav: model.MenuNav(..m.nav, focus: focus)), effect.none())
    }
  }
}

/// Enter or Space on the cursor row.
/// The ProblemRef under the menu cursor, when the focused pane holds one.
fn cursor_ref(m: Model) -> Result(ProblemRef, Nil) {
  case searching(m) {
    True -> {
      let hits = problems.search_refs(string.trim(m.search))
      case list.drop(hits, int.clamp(m.nav.search, 0, list.length(hits) - 1)) {
        [ref, ..] -> Ok(ref)
        [] -> Error(Nil)
      }
    }
    False ->
      case pane_rows(m, m.nav.focus) {
        ToggleRows(refs) ->
          case list.drop(refs, cursor_in(m, m.nav.focus)) {
            [ref, ..] -> Ok(ref)
            [] -> Error(Nil)
          }
        ChoiceRows(_) -> Error(Nil)
      }
  }
}

fn activate_cursor(m: Model) -> #(Model, Effect(Msg)) {
  case searching(m) {
    True -> {
      let hits = problems.search_refs(string.trim(m.search))
      case list.drop(hits, int.clamp(m.nav.search, 0, list.length(hits) - 1)) {
        [ref, ..] -> handle(m, UserToggledProblem(ref))
        [] -> #(m, effect.none())
      }
    }
    False -> {
      let pane = m.nav.focus
      let index = cursor_in(m, pane)
      case pane_rows(m, pane) {
        ChoiceRows(msgs) ->
          case list.drop(msgs, index) {
            [msg, ..] -> handle(m, msg)
            [] -> #(m, effect.none())
          }
        ToggleRows(refs) ->
          case list.drop(refs, index) {
            [ref, ..] -> handle(m, UserToggledProblem(ref))
            [] -> #(m, effect.none())
          }
      }
    }
  }
}

fn row_id(pane: model.MenuPane, index: Int) -> String {
  model.menu_row_id(pane, index)
}

fn scroll_to(id: String) -> Effect(Msg) {
  run_effect(fn() { browser.scroll_into_view(id) })
}

fn run_effect(action: fn() -> Nil) -> Effect(Msg) {
  use _dispatch <- effect.from
  action()
}

fn keyboard_effect() -> Effect(Msg) {
  use dispatch <- effect.from
  browser.on_keys(fn(key, ctrl, shift, editing) {
    dispatch(KeyPressed(model.Key(key:, ctrl:, shift:, editing:)))
  })
}

fn guest_has_progress() -> Bool {
  local.has_data()
}

fn api_base() -> String {
  browser.api_base()
}

/// The token for the current session, or "" when signed out. Callers that need
/// one are only reachable from behind the auth gate, so the empty case is a
/// belt-and-braces default rather than a real path.
fn token(m: Model) -> String {
  case m.mode {
    Account(token) -> token
    Guest -> ""
  }
}

/// Opening a checkable drill starts that language's (lazy) runtime download so
/// it is usually ready before the first Run click. Drills without checks never
/// load anything.
fn with_prefetch(pair: #(Model, Effect(Msg))) -> #(Model, Effect(Msg)) {
  let #(m, fx) = pair
  case
    m.route == DrillRoute && current_check(m) != Error(Nil),
    current_language(m)
  {
    True, Ok(language) ->
      case model.runtime_for(m, language) {
        RuntimeNotLoaded -> #(
          Model(
            ..m,
            runtimes: model.assoc_put(m.runtimes, language, RuntimeLoading),
          ),
          effect.batch([fx, runner.ensure(language)]),
        )
        // A failed load gets one fresh chance per drill open; without this
        // the only recovery was a page reload.
        RuntimeFailed(_) -> #(
          Model(
            ..m,
            runtimes: model.assoc_put(m.runtimes, language, RuntimeLoading),
          ),
          effect.batch([fx, runner.restart(language)]),
        )
        _ -> pair
      }
    _, _ -> pair
  }
}

fn current_problem(m: Model) -> Result(problem.Problem, Nil) {
  case model.current_ref(m) {
    Ok(ref) -> problems.find(ref.category, ref.subcategory, ref.title)
    Error(Nil) -> Error(Nil)
  }
}

fn current_language(m: Model) -> Result(String, Nil) {
  case model.current_ref(m) {
    Ok(ref) ->
      case problems.find(ref.category, ref.subcategory, ref.title) {
        Ok(p) -> Ok(problem.language_slug(p.language))
        Error(Nil) -> Error(Nil)
      }
    Error(Nil) -> Error(Nil)
  }
}

fn current_check(m: Model) -> Result(problem.Check, Nil) {
  case model.current_ref(m) {
    Ok(ref) ->
      case problems.find(ref.category, ref.subcategory, ref.title) {
        Ok(p) ->
          case p.check {
            Some(check) -> Ok(check)
            None -> Error(Nil)
          }
        Error(Nil) -> Error(Nil)
      }
    Error(Nil) -> Error(Nil)
  }
}

fn update(m: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  handle(m, msg)
}

fn handle(m: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    // --- keyboard ---
    KeyPressed(key) -> {
      // The `,` leader: one-shot rescue for keys a focused button would
      // otherwise swallow. Arms from anywhere but the editor and inputs;
      // the next key routes through the app's table regardless of focus.
      let leader_capable = key.editing != "editor" && key.editing != "input"
      case m.leader_armed, key.key == "," && leader_capable {
        False, True -> #(Model(..m, leader_armed: True), effect.none())
        True, _ -> {
          let m = Model(..m, leader_armed: False)
          case leader_capable && key.key != "," && key.key != "Escape" {
            True ->
              case keys.dispatch(m, model.Key(..key, editing: "none")) {
                Ok(resolved) -> handle(m, resolved)
                Error(Nil) -> #(m, effect.none())
              }
            False -> #(m, effect.none())
          }
        }
        False, False -> handle_key(m, key)
      }
    }

    HelpToggled -> #(Model(..m, help_open: !m.help_open), effect.none())

    EditorFocusRequested -> #(
      m,
      run_effect(fn() { browser.focus_element("gleam-editor") }),
    )

    SearchFocusRequested -> #(
      m,
      run_effect(fn() { browser.focus_element(".search") }),
    )

    MenuCursorMoved(delta) ->
      move_cursor(m, fn(index, last) { int.clamp(index + delta, 0, last) })

    MenuCursorJumped(first) ->
      move_cursor(m, fn(_index, last) {
        case first {
          True -> 0
          False -> last
        }
      })

    MenuPaneFocused(direction) -> focus_pane(m, direction)

    MenuActivated -> activate_cursor(m)

    MenuToggledAtCursor -> activate_cursor(m)

    // `z` in the browser: park the cursor row's card. Only rows with a card
    // react — an unseen problem has nothing to suspend.
    MenuSuspendedAtCursor ->
      case cursor_ref(m) {
        Ok(ref) -> handle(m, UserToggledSuspend(ref))
        Error(Nil) -> #(m, effect.none())
      }

    QuizMoved(delta) ->
      case m.graded, current_quiz(m) {
        False, Ok(quiz) -> {
          let last = list.length(quiz.choices) - 1
          let next = case m.choice {
            Some(current) -> int.clamp(current + delta, 0, last)
            // First press lands on an edge, so j starts at the top and k at
            // the bottom.
            None ->
              case delta > 0 {
                True -> 0
                False -> last
              }
          }
          #(Model(..m, choice: Some(next)), effect.none())
        }
        _, _ -> #(m, effect.none())
      }

    // --- session ---
    UserChangedAuthEmail(value) -> #(
      Model(..m, auth: AuthForm(..m.auth, email: value, error: None)),
      effect.none(),
    )

    UserChangedAuthPassword(value) -> #(
      Model(..m, auth: AuthForm(..m.auth, password: value, error: None)),
      effect.none(),
    )

    UserToggledAuthMode -> #(
      Model(
        ..m,
        auth: AuthForm(
          ..m.auth,
          mode: case m.auth.mode {
            SigningIn -> Registering
            Registering -> SigningIn
          },
          error: None,
        ),
      ),
      effect.none(),
    )

    UserSubmittedAuth ->
      case m.auth.busy, m.auth.email, m.auth.password {
        // Ignore a second submit while one is already in flight, so a double
        // click cannot create two accounts.
        True, _, _ -> #(m, effect.none())
        False, "", _ | False, _, "" -> #(
          Model(
            ..m,
            auth: AuthForm(
              ..m.auth,
              error: Some("Enter an email and a password."),
            ),
          ),
          effect.none(),
        )
        False, email, password -> #(
          Model(..m, auth: AuthForm(..m.auth, busy: True, error: None)),
          case m.auth.mode {
            SigningIn -> api.login(api_base(), email, password, AuthCompleted)
            Registering ->
              api.signup(
                api_base(),
                email,
                password,
                browser.time_zone(),
                AuthCompleted,
              )
          },
        )
      }

    AuthCompleted(Ok(session)) -> {
      let signed_in =
        Model(
          ..m,
          mode: Account(session.token),
          user: Some(session.user),
          boot: Syncing,
          // The password leaves the model the moment it is no longer needed.
          auth: AuthForm(..m.auth, password: "", busy: False, error: None),
        )

      // Whatever this browser was holding as a guest goes up now, before the
      // first state load, so the state that comes back already includes it.
      // On a brand new account there is nothing to lose by merging; signing
      // in to an existing one is handled by `UserClickedMergeGuest`, because
      // folding scratch progress into an established account unasked would be
      // surprising.
      let upgrading = m.auth.mode == Registering && guest_has_progress()

      #(
        Model(..signed_in, merge_offer: !upgrading && guest_has_progress()),
        effect.batch([
          session.save_token(session.token),
          case upgrading {
            True -> store.upgrade(session.token, [], StateImported)
            False -> effect.none()
          },
          store.load_state(signed_in),
        ]),
      )
    }

    AuthCompleted(Error(failure)) -> #(
      Model(
        ..m,
        auth: AuthForm(
          ..m.auth,
          busy: False,
          error: Some(api.error_message(failure)),
        ),
      ),
      effect.none(),
    )

    StateLoaded(Ok(state)) -> {
      let loaded = apply_state(m, state)
      case m.mode, legacy.pending() {
        // A guest adopts the pre-account blob locally at boot instead; there
        // is nothing to send anywhere.
        Guest, _ | _, None -> #(loaded, effect.none())
        Account(token), Some(old) ->
          case legacy.is_empty(old) {
            True -> #(loaded, legacy.mark_imported())
            False -> #(
              loaded,
              effect.batch([
                api.import_legacy(
                  api_base(),
                  token,
                  old.solved,
                  [],
                  old.drafts,
                  StateImported,
                ),
                legacy.mark_imported(),
              ]),
            )
          }
      }
    }

    // The token is dead. Drop it and fall back to guest, which is at least a
    // usable app rather than an error screen.
    StateLoaded(Error(api.Unauthorised)) -> {
      let guest =
        Model(
          ..model.default(),
          editor_keymap: m.editor_keymap,
          side_collapsed: m.side_collapsed,
          muted_languages: m.muted_languages,
          boot: Syncing,
        )
      #(guest, effect.batch([session.clear_token(), store.load_state(guest)]))
    }

    StateLoaded(Error(failure)) -> #(
      Model(..m, boot: SyncFailed(api.error_message(failure))),
      effect.none(),
    )

    // Progress merged. Wipe the local copy so signing out later cannot
    // resurrect a stale duplicate, and reload so the screen shows the
    // authoritative state.
    StateImported(Ok(Nil)) -> #(
      Model(..m, merge_offer: False),
      effect.batch([store.clear_guest(), store.load_state(m)]),
    )

    StateImported(Error(failure)) -> #(
      Model(
        ..m,
        notice: Some(
          "Your progress could not be moved to this account: "
          <> api.error_message(failure),
        ),
      ),
      effect.none(),
    )

    UserClickedMergeGuest -> #(
      Model(..m, merge_offer: False),
      store.upgrade(token(m), [], StateImported),
    )

    UserClickedSignOut -> {
      let signed_out =
        Model(
          ..model.default(),
          editor_keymap: m.editor_keymap,
          side_collapsed: m.side_collapsed,
          muted_languages: m.muted_languages,
          boot: Syncing,
        )
      #(
        signed_out,
        effect.batch([
          api.logout(api_base(), token(m), SignOutCompleted),
          session.clear_token(),
          // Back to guest rather than to a sign-in wall. The guest store was
          // cleared on upgrade, so this loads empty.
          store.load_state(signed_out),
        ]),
      )
    }

    // The local session is already gone; whether the server agreed is not
    // worth telling the user about.
    SignOutCompleted(_) -> #(m, effect.none())

    UserDismissedNotice -> #(
      Model(..m, notice: None, merge_offer: False),
      effect.none(),
    )

    UserDismissedUpgradePrompt -> #(
      Model(..m, upgrade_prompt: PromptDismissed),
      local_dismiss_prompt(),
    )

    UserClickedSignIn(mode) -> #(
      Model(
        ..m,
        route: AuthRoute,
        auth: AuthForm(..m.auth, mode:, error: None, busy: False),
      ),
      effect.none(),
    )

    // --- the scheduler ---
    UserClickedStudy ->
      case queue.build(m) {
        [] -> #(
          Model(
            ..m,
            notice: Some(case queue.hidden_count(m) {
              0 ->
                "Nothing to study right now. Come back when cards are due, or pick problems by hand."
              hidden ->
                int.to_string(hidden)
                <> " due card(s) are hidden by the language filter."
            }),
          ),
          effect.none(),
        )
        queue ->
          with_prefetch(#(
            Model(
              ..open_first(Model(..m, studying: True), queue),
              // A scheduled sitting is one pass: FSRS decides when a card comes
              // back, so repeating it three times now would just be three
              // same-day reviews.
              iteration_count: 1,
            ),
            effect.none(),
          ))
      }

    UserClickedBrowse -> #(Model(..m, route: MenuRoute), effect.none())

    UserClickedBackToStudy -> #(Model(..m, route: StudyRoute), effect.none())

    UserClickedStats -> #(
      Model(..m, route: StatsRoute, detail: None),
      effect.batch([store.load_stats(m), store.load_insights(m)]),
    )

    StatsLoaded(Ok(loaded)) -> #(Model(..m, stats: Some(loaded)), effect.none())

    StatsLoaded(Error(failure)) -> #(
      Model(..m, notice: Some(api.error_message(failure))),
      effect.none(),
    )

    InsightsLoaded(Ok(loaded)) -> #(
      Model(..m, insights: Some(loaded)),
      effect.none(),
    )

    InsightsLoaded(Error(failure)) -> #(
      Model(..m, notice: Some(api.error_message(failure))),
      effect.none(),
    )

    StatsCursorMoved(delta) ->
      case m.insights {
        Some(data) -> {
          let rows = insights.listed(insights.analyse(data, m.cards, m.now))
          let last = int.max(0, list.length(rows) - 1)
          #(
            Model(
              ..m,
              nav: model.MenuNav(
                ..m.nav,
                stats: int.clamp(m.nav.stats + delta, 0, last),
              ),
            ),
            effect.none(),
          )
        }
        None -> #(m, effect.none())
      }

    StatsActivated ->
      case m.insights {
        Some(data) -> {
          let rows = insights.listed(insights.analyse(data, m.cards, m.now))
          case
            list.drop(rows, int.clamp(m.nav.stats, 0, list.length(rows) - 1))
          {
            [row, ..] -> handle(m, UserOpenedDetail(row.problem))
            [] -> #(m, effect.none())
          }
        }
        None -> #(m, effect.none())
      }

    UserOpenedDetail(problem) -> #(
      Model(..m, detail: Some(#(problem, None))),
      store.load_history(m, problem),
    )

    UserClosedDetail -> #(Model(..m, detail: None), effect.none())

    HistoryLoaded(problem, Ok(rows)) ->
      case m.detail {
        // Only fill the panel still being looked at; a slow response for a
        // closed panel is dropped.
        Some(#(open, None)) if open == problem -> #(
          Model(..m, detail: Some(#(problem, Some(rows)))),
          effect.none(),
        )
        _ -> #(m, effect.none())
      }

    HistoryLoaded(_, Error(failure)) -> #(
      Model(..m, detail: None, notice: Some(api.error_message(failure))),
      effect.none(),
    )

    UserGraded(rating) ->
      case m.grading, model.current_ref(m) {
        // Guard against a second press while the first is in flight: a review
        // must not be recorded twice.
        SubmittingGrade, _ -> #(m, effect.none())
        _, Error(Nil) -> #(m, effect.none())
        _, Ok(ref) -> #(
          Model(..m, grading: SubmittingGrade, sitting: [
            model.SittingEntry(
              problem: ref,
              pressed: rating,
              duration_ms: browser.now_ms() - m.opened_at_ms,
            ),
            ..m.sitting
          ]),
          store.record_review(
            m,
            wire.Review(
              problem: ref,
              rating:,
              duration_ms: Some(browser.now_ms() - m.opened_at_ms),
              auto_failed: model.run_failed(m.run),
              revealed: case current_problem(m) {
                Ok(current) -> model.answer_revealed(m, current.approach)
                Error(Nil) -> m.revealed_solution != None
              },
              // A hand-picked sitting is practice: self-graded, uncoerced.
              practice: !m.studying,
            ),
          ),
        )
      }

    ReviewRecorded(Ok(outcome)) -> {
      let cards = dict.insert(m.cards, outcome.card.problem, outcome.card)
      let recorded =
        Model(
          ..m,
          now: outcome.now,
          today: outcome.today,
          cards:,
          upgrade_prompt: escalate(m),
        )
      case m.grading {
        // A graded drill moves on by itself; a quiz waits for Next, because
        // the explanation is worth reading first.
        SubmittingGrade -> advance(Model(..recorded, grading: NotGrading))
        _ -> #(recorded, effect.none())
      }
    }

    ReviewRecorded(Error(failure)) -> #(
      Model(
        ..m,
        grading: case m.grading {
          SubmittingGrade -> AwaitingGrade
          other -> other
        },
        storage_full: m.mode == Guest || m.storage_full,
        notice: Some(api.error_message(failure)),
      ),
      effect.none(),
    )

    DraftSynced(Ok(Nil)) -> #(m, effect.none())
    // A failed sync is silent data loss: the typing looked saved and was not.
    // Same surfacing as a failed review write; the next keystroke retries.
    DraftSynced(Error(failure)) -> #(
      Model(
        ..m,
        storage_full: m.mode == Guest || m.storage_full,
        notice: Some(api.error_message(failure)),
      ),
      effect.none(),
    )

    UserClickedCategory(name) -> #(
      Model(..m, selected_category: Some(name), selected_subcategory: None),
      effect.none(),
    )

    UserClickedSubcategory(name) -> #(
      Model(..m, selected_subcategory: Some(name)),
      effect.none(),
    )

    UserClickedBreadcrumb(level) ->
      case level {
        0 -> #(
          Model(..m, selected_category: None, selected_subcategory: None),
          effect.none(),
        )
        _ -> #(Model(..m, selected_subcategory: None), effect.none())
      }

    UserToggledProblem(ref) -> #(
      Model(..m, selected: toggle_selection(m.selected, ref)),
      effect.none(),
    )

    UserClickedSelectAll ->
      case m.selected_category, m.selected_subcategory {
        Some(cat), Some(sub) -> {
          let refs =
            problems.problems_in(cat, sub)
            |> list.map(fn(p) { ProblemRef(cat, sub, p.title) })
            |> list.filter(fn(ref) { !list.contains(m.selected, ref) })
          #(Model(..m, selected: list.append(m.selected, refs)), effect.none())
        }
        _, _ -> #(m, effect.none())
      }

    UserClickedClearSelection -> #(Model(..m, selected: []), effect.none())

    UserChangedIterations(raw) -> {
      let count = case int.parse(raw) {
        Ok(value) if value > 0 -> value
        _ -> 1
      }
      #(Model(..m, iteration_count: count), effect.none())
    }

    UserClickedStartDrill ->
      case m.selected {
        [] -> #(m, effect.none())
        [first, ..] ->
          with_prefetch(#(
            Model(
              ..m,
              route: DrillRoute,
              problem_index: 0,
              current_iteration: 1,
              // A hand-picked sitting still ends where it started.
              studying: False,
              draft: draft_for(m, first),
              revealed_solution: None,
              hints_revealed: 0,
              run: RunIdle,
              // Without this a reveal-only drill -- Elixir has no harness at
              // all -- would sit forever on "run the tests to grade this" with
              // no tests to run, and could never be scheduled.
              grading: initial_grading(m, first),
              opened_at_ms: browser.now_ms(),
              // Clearing the log is what distinguishes a drill from an exam at
              // the end of the run: a non-empty log means a report is owed.
              exam_answers: [],
              sitting: [],
              choice: None,
              graded: False,
            ),
            effect.none(),
          ))
      }

    UserClickedStartExam -> #(
      m,
      effect.from(fn(dispatch) { dispatch(ExamSampled(sample_exam())) }),
    )

    ExamSampled(refs) ->
      case refs {
        [] -> #(m, effect.none())
        _ -> #(
          Model(
            ..m,
            route: DrillRoute,
            selected: refs,
            problem_index: 0,
            // The exam is reachable from both the study screen and the menu,
              // and finishing it should hand you back to whichever you came
              // from rather than always to the menu.
              studying: m.route == StudyRoute,
            // An exam is one pass over the questions; repeating it inside the
            // sitting would score the same question twice.
            iteration_count: 1,
            current_iteration: 1,
            exam_answers: [],
            sitting: [],
            choice: None,
            graded: False,
            revealed_solution: None,
            hints_revealed: 0,
            run: RunIdle,
            draft: "",
          ),
          effect.none(),
        )
      }

    UserClickedExitReport -> #(
      Model(
        ..m,
        route: case m.studying {
          True -> StudyRoute
          False -> MenuRoute
        },
        studying: False,
      ),
      effect.none(),
    )

    UserPickedChoice(index) ->
      case m.graded {
        True -> #(m, effect.none())
        False -> #(Model(..m, choice: Some(index)), effect.none())
      }

    UserSubmittedAnswer ->
      case m.graded, m.choice, current_quiz(m), model.current_ref(m) {
        False, Some(picked), Ok(quiz), Ok(ref) -> {
          let right = picked == quiz.correct
          #(
            Model(
              ..m,
              graded: True,
              // Appended at the head; the report only groups and counts, so
              // the order does not matter.
              exam_answers: [#(ref, right), ..m.exam_answers],
            ),
            // A quiz grades itself: the answer is either right or it is not,
            // so there is no Hard/Good/Easy judgement to ask for. The review
            // is recorded now and the user still presses Next, because the
            // explanation is worth reading before moving on.
            store.record_review(
              m,
              wire.Review(
                problem: ref,
                rating: case right {
                  True -> fsrs.Good
                  False -> fsrs.Again
                },
                duration_ms: Some(browser.now_ms() - m.opened_at_ms),
                auto_failed: !right,
                revealed: False,
                // The exam is an assessment, not practice: coercion applies.
                practice: False,
              ),
            ),
          )
        }
        _, _, _, _ -> #(m, effect.none())
      }

    UserClickedExitDrill -> #(
      m,
      effect.from(fn(dispatch) {
        dispatch(
          ExitConfirmed(
            browser.confirm(case current_quiz(m), m.studying {
              Ok(_), _ -> "Exit the exam? You will not get a score for it."
              // Study-rep typing is deliberately not persisted; a manual
              // drill's draft was saved moments after the last keystroke.
              Error(Nil), True ->
                "Exit the drill? Your typed code will be lost."
              Error(Nil), False ->
                "Exit the drill? Your code is saved as a draft."
            }),
          ),
        )
      }),
    )

    // `reset_home`, not `reset_to_menu`: a sitting started from the study
    // queue must end back on the study screen. Landing in the manual browser
    // is disorienting when that is not where you came from.
    ExitConfirmed(True) -> {
      let #(m, abandoned) = abandon_run(m)
      #(reset_home(m), abandoned)
    }
    ExitConfirmed(False) -> #(m, effect.none())

    UserRevealedHint -> {
      let cap = case current_problem(m) {
        Ok(current) -> list.length(current.approach)
        Error(Nil) -> 0
      }
      #(
        Model(..m, hints_revealed: int.min(m.hints_revealed + 1, cap)),
        effect.none(),
      )
    }

    UserToggledSolution(index) -> {
      let revealed = case m.revealed_solution {
        Some(current) if current == index -> None
        _ -> Some(index)
      }
      #(Model(..m, revealed_solution: revealed), effect.none())
    }

    UserClickedNext -> advance(m)

    UserSearched(query) -> #(Model(..m, search: query), effect.none())

    UserChangedKeymap(mode) -> {
      let m = Model(..m, editor_keymap: mode)
      #(m, save_preferences(m))
    }

    UserToggledSide -> {
      let m = Model(..m, side_collapsed: !m.side_collapsed)
      #(m, save_preferences(m))
    }

    UserClickedSettings -> #(Model(..m, route: SettingsRoute), effect.none())

    // Committed on blur or Enter, so this fires once per edit rather than per
    // keystroke, and saving immediately is affordable.
    UserChangedSetting(field, raw) -> {
      let settings = apply_setting(m.settings, field, raw)
      let m = Model(..m, settings:)
      #(m, store.save_settings(m, settings))
    }

    UserClickedDeviceTimezone -> {
      let settings = wire.Settings(..m.settings, timezone: browser.time_zone())
      let m = Model(..m, settings:)
      #(m, store.save_settings(m, settings))
    }

    // The server answers with what it stored, so this is the authoritative
    // copy -- it may differ from what was sent if a bound was hit.
    SettingsSaved(Ok(settings)) -> #(Model(..m, settings:), effect.none())

    SettingsSaved(Error(error)) -> #(
      Model(..m, notice: Some(api.error_message(error))),
      effect.none(),
    )

    // The picker collects what you want; `muted_languages` stores what you do
    // not, so the inversion happens once, here, on confirm.
    PickerToggledLanguage(tag) -> {
      let picked = case list.contains(m.picked_languages, tag) {
        True -> list.filter(m.picked_languages, fn(t) { t != tag })
        False -> [tag, ..m.picked_languages]
      }
      #(Model(..m, picked_languages: picked), effect.none())
    }

    PickerConfirmed ->
      case m.picked_languages {
        // The button is disabled in this state; the guard is here so the
        // keyboard cannot get past it either.
        [] -> #(m, effect.none())
        picked -> {
          let muted =
            problems.language_options()
            |> list.map(fn(option) { option.0 })
            |> list.filter(fn(tag) { !list.contains(picked, tag) })
          let m =
            Model(
              ..m,
              muted_languages: muted,
              languages_chosen: True,
              route: StudyRoute,
            )
          #(m, save_preferences(m))
        }
      }

    UserToggledLanguage(tag) -> {
      let muted = case list.contains(m.muted_languages, tag) {
        True -> list.filter(m.muted_languages, fn(t) { t != tag })
        False -> [tag, ..m.muted_languages]
      }
      let m = Model(..m, muted_languages: muted)
      #(m, save_preferences(m))
    }

    UserToggledSuspend(ref) ->
      case model.card_for(m, ref) {
        None -> #(m, effect.none())
        Some(state) -> #(m, store.set_suspended(m, ref, !state.suspended))
      }

    CardSuspended(Ok(outcome)) -> #(
      Model(
        ..m,
        now: outcome.now,
        today: outcome.today,
        cards: dict.insert(m.cards, outcome.card.problem, outcome.card),
      ),
      effect.none(),
    )
    CardSuspended(Error(failure)) -> #(
      Model(..m, notice: Some(api.error_message(failure))),
      effect.none(),
    )

    EditorChanged(text) -> {
      // Study-rep typing is throwaway in memory as well as on disk: updating
      // the assoc here would let a manual open minutes later restore the
      // answer you just typed from memory, which is the leak the study reset
      // exists to prevent.
      let drafts = case model.current_ref(m), m.studying {
        Ok(ref), False -> model.assoc_put(m.drafts, ref, text)
        _, _ -> m.drafts
      }
      #(Model(..m, draft: text, drafts: drafts), schedule_draft_save())
    }

    DraftSaveTicked ->
      case model.current_ref(m), m.studying {
        // A study rep is throwaway typing; persisting it would clobber the
        // draft saved from a real working session on the same problem.
        _, True -> #(m, effect.none())
        Ok(ref), False -> #(m, store.save_draft(m, ref, m.draft))
        Error(Nil), _ -> #(m, effect.none())
      }

    UserClickedRun ->
      case m.run {
        // One run at a time: `r` and Ctrl+Enter bypass the disabled button,
        // and a queued second run just doubles the wait.
        Running(_, _) -> #(m, effect.none())
        _ ->
          case current_language(m), current_check(m) {
            Ok(language), Ok(check) ->
              case model.runtime_for(m, language) {
                RuntimeReady -> {
                  let id = m.next_run_id
                  let previous = case m.run {
                    Ran(_, stdout) -> stdout
                    _ -> ""
                  }
                  #(
                    Model(..m, run: Running(id, previous), next_run_id: id + 1),
                    runner.run(language, id, m.draft, check.harness),
                  )
                }
                // The button is disabled in these states, but the keyboard
                // paths land here too and silence reads as a broken key.
                RuntimeLoading | RuntimeNotLoaded -> #(
                  Model(
                    ..m,
                    notice: Some(
                      "The runtime is still loading \u{2014} the Run button enables when it's ready.",
                    ),
                  ),
                  effect.none(),
                )
                RuntimeFailed(_) -> #(
                  Model(
                    ..m,
                    notice: Some(
                      "The runtime failed to load \u{2014} use Retry next to the Run button.",
                    ),
                  ),
                  effect.none(),
                )
              }
            _, _ -> #(m, effect.none())
          }
      }

    UserClickedStopRun -> abandon_run(m)

    UserClickedRetryRuntime(language) -> #(
      Model(
        ..m,
        runtimes: model.assoc_put(m.runtimes, language, RuntimeLoading),
      ),
      runner.restart(language),
    )

    RunnerReady(language) -> #(
      Model(..m, runtimes: model.assoc_put(m.runtimes, language, RuntimeReady)),
      effect.none(),
    )
    RunnerFailed(language, message) -> #(
      Model(
        ..m,
        runtimes: model.assoc_put(m.runtimes, language, RuntimeFailed(message)),
        // A dead runtime cannot finish the in-flight run; clearing it here
        // stops the still-armed timeout from reporting a bogus infinite loop.
        run: case m.run {
          Running(_, _) -> RunIdle
          other -> other
        },
      ),
      effect.none(),
    )

    RunFinished(id, outcome, stdout) ->
      case m.run {
        Running(current, _) if current == id -> #(
          // Whatever the harness said, the drill is now answerable: the
          // grading bar decides what the buttons offer.
          Model(..m, run: Ran(outcome, stdout), grading: AwaitingGrade),
          // Blur the editor so 1-4 grade immediately: the whole rep is
          // type, Ctrl+Enter, digit.
          run_effect(browser.blur_active),
        )
        _ -> #(m, effect.none())
      }

    RunTimedOut(id) ->
      case m.run {
        Running(current, _) if current == id -> {
          let timed_out =
            Model(..m, run: Ran(TimedOut, ""), grading: AwaitingGrade)
          // The worker cannot be interrupted, only replaced.
          case current_language(m) {
            Ok(language) -> #(
              Model(
                ..timed_out,
                runtimes: model.assoc_put(m.runtimes, language, RuntimeLoading),
              ),
              runner.restart(language),
            )
            Error(Nil) -> #(timed_out, effect.none())
          }
        }
        _ -> #(m, effect.none())
      }

    // Armed alongside every spawn; a stale timer for a runtime that made it
    // to ready (or already failed loudly) is a no-op.
    RuntimeLoadTimedOut(language) ->
      case model.runtime_for(m, language) {
        RuntimeLoading -> #(
          Model(
            ..m,
            runtimes: model.assoc_put(
              m.runtimes,
              language,
              RuntimeFailed("The runtime took too long to load."),
            ),
          ),
          effect.none(),
        )
        _ -> #(m, effect.none())
      }
  }
}

/// Folds a fresh `/api/state` into the model.
///
/// Note the route: a signed-in user lands on the study screen, not the manual
/// browser. The browser is still there, but what to study today is the
/// question the app now answers first.
fn apply_state(m: Model, state: api.BootState) -> Model {
  Model(
    ..m,
    user: Some(state.user),
    boot: Synced,
    now: state.now,
    settings: state.settings,
    cards: dict.from_list(
      list.map(state.cards, fn(card) { #(card.problem, card) }),
    ),
    today: state.today,
    drafts: state.drafts,
    // The one place that decides where boot lands. A browser that has never
    // answered the language question goes to the picker instead of the study
    // screen, because the queue it would otherwise build is one language deep
    // by accident rather than by choice.
    route: case m.languages_chosen {
      True -> StudyRoute
      False -> PickerRoute
    },
    // Evaluated on every load, not only after a review: a guest who crossed
    // the threshold in a previous session should still be told.
    upgrade_prompt: escalate(m),
  )
}

/// Parse one settings input and clamp it into range.
///
/// The bounds mirror `validate_settings` in the server's routes/study.gleam.
/// Clamping rather than rejecting is deliberate: these come from a number
/// input whose own min/max the browser already shows, so a value outside them
/// is a typo, and snapping it is friendlier than an error. Unparseable text
/// leaves the setting alone.
fn apply_setting(
  settings: api.Settings,
  field: model.SettingField,
  raw: String,
) -> api.Settings {
  case field {
    NewPerDay ->
      case int.parse(raw) {
        Ok(value) ->
          wire.Settings(..settings, new_per_day: int.clamp(value, 0, 100))
        Error(Nil) -> settings
      }
    ReviewsPerDay ->
      case int.parse(raw) {
        Ok(value) ->
          wire.Settings(..settings, reviews_per_day: int.clamp(value, 0, 500))
        Error(Nil) -> settings
      }
    DayStartHour ->
      case int.parse(raw) {
        Ok(value) ->
          wire.Settings(..settings, day_start_hour: int.clamp(value, 0, 23))
        Error(Nil) -> settings
      }
    DesiredRetention ->
      case float.parse(raw) {
        Ok(value) ->
          wire.Settings(
            ..settings,
            scheduler: fsrs.Config(
              ..settings.scheduler,
              desired_retention: float.clamp(value, 0.7, 0.99),
            ),
          )
        // An integer in a step-0.01 field: "1" should mean 1.0, not nothing.
        Error(Nil) ->
          case int.parse(raw) {
            Ok(whole) ->
              wire.Settings(
                ..settings,
                scheduler: fsrs.Config(
                  ..settings.scheduler,
                  desired_retention: float.clamp(int.to_float(whole), 0.7, 0.99),
                ),
              )
            Error(Nil) -> settings
          }
      }
  }
}

/// Starts a sitting on the given list of problems.
fn open_first(m: Model, queue: List(ProblemRef)) -> Model {
  case queue {
    [] -> m
    [first, ..] ->
      Model(
        ..m,
        route: DrillRoute,
        selected: queue,
        problem_index: 0,
        current_iteration: 1,
        // A study rep starts from the stub: retyping from memory is the whole
        // product, and restoring your previous answer would defeat it. Manual
        // sittings keep restoring work in progress.
        draft: case m.studying {
          True -> starter_for(first)
          False -> draft_for(m, first)
        },
        revealed_solution: None,
        hints_revealed: 0,
        run: RunIdle,
        grading: initial_grading(m, first),
        opened_at_ms: browser.now_ms(),
        exam_answers: [],
        sitting: [],
        choice: None,
        graded: False,
      )
  }
}

/// A drill with no harness has nothing to run, so it is gradeable the moment
/// it opens. One with a harness waits for a result.
/// What the grade bar starts as when a problem opens.
///
/// Gradeable from the first moment when either there is nothing to run (a
/// reveal-only drill is a flashcard proper) or this is the problem's first
/// encounter — the learning step, where you reveal, study, and self-grade like
/// flipping a card. Otherwise a run is required before grading.
fn initial_grading(m: Model, ref: ProblemRef) -> model.Grading {
  case problem_kind(ref) {
    // Quizzes grade themselves on submit.
    QuizProblem -> NotGrading
    CheckableProblem ->
      case model.first_encounter(m, ref) {
        True -> AwaitingGrade
        False -> NotGrading
      }
    RevealOnlyProblem -> AwaitingGrade
  }
}

type ProblemKind {
  CheckableProblem
  QuizProblem
  RevealOnlyProblem
}

fn problem_kind(ref: ProblemRef) -> ProblemKind {
  case problems.find(ref.category, ref.subcategory, ref.title) {
    Ok(found) ->
      case found.check, found.quiz {
        _, Some(_) -> QuizProblem
        Some(_), None -> CheckableProblem
        None, None -> RevealOnlyProblem
      }
    Error(Nil) -> RevealOnlyProblem
  }
}

/// Persist the settings that belong to this browser rather than the account.
///
/// Written whole every time, so every caller must pass a model that already
/// holds the change it wants saved.
fn save_preferences(m: Model) -> Effect(Msg) {
  session.save_preferences(session.Preferences(
    editor_keymap: m.editor_keymap,
    side_collapsed: m.side_collapsed,
    muted_languages: m.muted_languages,
    languages_chosen: m.languages_chosen,
  ))
}

fn handle_key(m: Model, key: model.Key) -> #(Model, Effect(Msg)) {
  case key.editing {
    // The editor's own keymaps own the keyboard; the one thing the app
    // claims there is Ctrl+Enter, so write -> run -> grade needs no mouse.
    "editor" ->
      case key.ctrl && key.key == "Enter" && m.route == DrillRoute {
        True -> handle(m, UserClickedRun)
        False -> #(m, effect.none())
      }
    // Inputs keep their keys; Escape hands focus back to the app.
    "input" ->
      case key.key {
        "Escape" -> #(m, run_effect(browser.blur_active))
        _ -> #(m, effect.none())
      }
    // A focused button activates natively; stay out of its way — except
    // for Escape, which activates nothing and would otherwise die on
    // whichever button was clicked last (grade, reveal, run).
    "control" ->
      case key.key {
        "Escape" ->
          case keys.dispatch(m, key) {
            Ok(resolved) -> handle(m, resolved)
            Error(Nil) -> #(m, effect.none())
          }
        _ -> #(m, effect.none())
      }
    _ ->
      case keys.dispatch(m, key) {
        Ok(resolved) -> handle(m, resolved)
        Error(Nil) -> #(m, effect.none())
      }
  }
}

fn abandon_run(m: Model) -> #(Model, Effect(Msg)) {
  case m.run, current_language(m) {
    Running(_, _), Ok(language) -> #(
      Model(
        ..m,
        run: RunIdle,
        runtimes: model.assoc_put(m.runtimes, language, RuntimeLoading),
      ),
      runner.restart(language),
    )
    Running(_, _), Error(Nil) -> #(Model(..m, run: RunIdle), effect.none())
    _, _ -> #(m, effect.none())
  }
}

fn advance(m: Model) -> #(Model, Effect(Msg)) {
  // Before anything else: `m` still points at the problem whose run may be
  // in flight, which is the only moment its language can be resolved.
  let #(m, abandoned) = abandon_run(m)
  let #(next, fx) = advance_inner(m)
  #(next, effect.batch([abandoned, fx]))
}

fn advance_inner(m: Model) -> #(Model, Effect(Msg)) {
  // Round-robin: walk the whole selection, then come back around for the
  // next pass. Drilling one problem N times in a row before moving on is
  // the thing this deliberately avoids.
  let #(index, iteration) = case m.problem_index + 1 < list.length(m.selected) {
    True -> #(m.problem_index + 1, m.current_iteration)
    False -> #(0, m.current_iteration + 1)
  }

  case iteration > m.iteration_count, m.exam_answers {
    // An exam ends in the report rather than an alert — the score is the
    // entire reason the sitting happened.
    True, [_, ..] -> #(
      // `reset_home` clears `studying`, but the report still needs to know
      // where the sitting began so its back button returns there.
      Model(..reset_home(m), route: ReportRoute, studying: m.studying),
      effect.none(),
    )
    // A drill sitting earns a report too. `reset_home` clears `studying`, so
    // like the exam arm this puts it back for the sake of the back button.
    True, [] -> #(
      Model(
        ..reset_home(m),
        route: SummaryRoute,
        studying: m.studying,
        sitting: m.sitting,
      ),
      effect.none(),
    )
    False, _ -> {
      let advanced =
        Model(
          ..m,
          current_iteration: iteration,
          problem_index: index,
          revealed_solution: None,
          hints_revealed: 0,
          run: RunIdle,
          grading: NotGrading,
          opened_at_ms: browser.now_ms(),
          choice: None,
          graded: False,
        )
      // Retyping is the drill, so a repeat pass starts from the stub. The
      // first time a problem comes up in a sitting, though, whatever you last
      // typed is restored — that is the point of syncing drafts at all.
      let advanced = case model.current_ref(advanced) {
        Ok(ref) ->
          Model(
            ..advanced,
            draft: case iteration == 1 && !m.studying {
              True -> draft_for(advanced, ref)
              False -> starter_for(ref)
            },
            grading: initial_grading(m, ref),
          )
        Error(Nil) -> Model(..advanced, draft: "")
      }
      with_prefetch(#(advanced, effect.none()))
    }
  }
}

/// Ends a sitting, returning to wherever it started from.
///
/// A scheduled sitting also clears the selection: the study queue was never
/// something the user picked, and leaving it behind would make the next manual
/// drill drag along ten problems they never chose. A manual selection is
/// theirs and survives.
fn reset_home(m: Model) -> Model {
  Model(
    ..reset_to_menu(m),
    route: case m.studying {
      True -> StudyRoute
      False -> MenuRoute
    },
    selected: case m.studying {
      True -> []
      False -> m.selected
    },
    studying: False,
    grading: NotGrading,
  )
}

fn draft_for(m: Model, ref: ProblemRef) -> String {
  case model.assoc_get(m.drafts, ref) {
    Ok(text) -> text
    Error(Nil) -> starter_for(ref)
  }
}

fn starter_for(ref: ProblemRef) -> String {
  case problems.find(ref.category, ref.subcategory, ref.title) {
    Ok(p) ->
      case p.check {
        Some(check) -> check.starter
        None -> ""
      }
    Error(Nil) -> ""
  }
}

fn schedule_draft_save() -> Effect(Msg) {
  effect.from(fn(dispatch) {
    browser.debounce("draft-save", 400, fn() { dispatch(DraftSaveTicked) })
  })
}

fn reset_to_menu(m: Model) -> Model {
  Model(
    ..m,
    route: MenuRoute,
    problem_index: 0,
    current_iteration: 1,
    draft: "",
    revealed_solution: None,
    hints_revealed: 0,
    run: RunIdle,
    choice: None,
    graded: False,
  )
}

/// Questions per sitting, spread flat across the sections rather than in
/// proportion to how many questions each one has. Equal resolution per section
/// is the point: a section sampled twice cannot tell you anything about
/// whether you know it.
const exam_size = 40

/// Take an equal slice of each section, shuffled, then shuffle the result so
/// the questions do not arrive grouped by section. Sections thinner than the
/// slice contribute everything they have, so the exam is smaller than
/// `exam_size` while the pool is still being written.
fn sample_exam() -> List(ProblemRef) {
  let pool = problems.quiz_pool()
  let per_section = case list.length(pool) {
    0 -> 0
    sections -> int.max(1, exam_size / sections)
  }
  pool
  |> list.flat_map(fn(entry) { list.take(shuffle(entry.1), per_section) })
  |> shuffle
}

fn shuffle(items: List(a)) -> List(a) {
  shuffle_loop(items, list.length(items), [])
}

fn shuffle_loop(remaining: List(a), count: Int, acc: List(a)) -> List(a) {
  case count {
    n if n <= 0 -> acc
    _ -> {
      let #(before, rest) = list.split(remaining, browser.random_int(count))
      case rest {
        [picked, ..after] ->
          shuffle_loop(list.append(before, after), count - 1, [picked, ..acc])
        [] -> list.append(acc, remaining)
      }
    }
  }
}

fn current_quiz(m: Model) -> Result(problem.Quiz, Nil) {
  case model.current_ref(m) {
    Ok(ref) ->
      case problems.find(ref.category, ref.subcategory, ref.title) {
        Ok(p) ->
          case p.quiz {
            Some(quiz) -> Ok(quiz)
            None -> Error(Nil)
          }
        Error(Nil) -> Error(Nil)
      }
    Error(Nil) -> Error(Nil)
  }
}

fn toggle_selection(
  selected: List(ProblemRef),
  ref: ProblemRef,
) -> List(ProblemRef) {
  case list.contains(selected, ref) {
    True -> list.filter(selected, fn(r) { r != ref })
    False -> list.append(selected, [ref])
  }
}

fn view(m: Model) -> Element(Msg) {
  case m.boot {
    // The one blocking load. A guest resolves it locally and instantly; an
    // account waits on the network, and a failure there is a dead end worth
    // saying out loud, because the app is online-only once signed in.
    NotStarted | Syncing | SyncFailed(_) -> auth.loading(m)
    Synced -> {
      let screen = case m.route {
        AuthRoute -> auth.view(m)
        PickerRoute -> picker.view(m)
        SettingsRoute -> settings.view(m)
        SummaryRoute -> summary.view(m)
        StudyRoute -> study.view(m)
        StatsRoute -> stats.view(m)
        DrillRoute ->
          case drill.view(m) {
            Ok(el) -> el
            Error(Nil) -> menu.view(m)
          }
        ReportRoute -> report.view(m)
        MenuRoute -> menu.view(m)
      }
      case m.route {
        // The sign-in form keeps its focused, chrome-free layout.
        AuthRoute -> screen
        _ -> element.fragment([screen, statusbar.view(m), help.view(m)])
      }
    }
  }
}
