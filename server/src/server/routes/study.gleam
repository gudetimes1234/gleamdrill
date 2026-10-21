//// Study endpoints: boot state, recording reviews, drafts and settings.

import fsrs
import gleam/crypto
import gleam/dynamic/decode
import gleam/http
import gleam/int
import gleam/json.{type Json}
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleam/time/timestamp
import server/study/archive
import server/study/cards
import server/study/drafts
import server/study/insights
import server/study/legacy_import
import server/study/model.{type CardRecord}
import server/study/notes
import server/study/profile
import server/study/queues
import server/study/reviews
import server/study/stats
import server/study/today
import server/study/track
import server/study/validate
import server/web.{type Context}
import wire
import wisp

/// Everything the app needs to start, in one request.
///
/// The client is authoritative for nothing here, including the clock: `now` is
/// the server's time, so due comparisons in the UI agree with the scheduling
/// that produced them even if the device clock is wrong.
pub fn state(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Get)
  use user <- web.require_user(request, context)

  let now = timestamp.system_time()
  let result = {
    use account <- result.try(profile.load_account(context.db, user.id))
    use standings <- result.try(today.standings(
      context.db,
      user.id,
      account,
      now,
    ))
    // No `?track=` means "wherever I left off", which the server answers as
    // the track holding the most cards -- and for a brand new account, the
    // empty string, which matches nothing and lands on the switcher.
    let track = track.pick(query_track(request), standings)
    // Same rule as `resolve_track`, off the standings this already has.
    use settings <- result.try(profile.load_settings(context.db, user.id, track))
    let profile = wire.Profile(account:, settings:)
    use cards <- result.try(cards.load_cards_in(context.db, user.id, track))
    use drafts <- result.try(drafts.load_drafts_in(context.db, user.id, track))
    use notes <- result.try(notes.load_notes_in(context.db, user.id, track))
    use queues <- result.try(queues.load_queues_in(context.db, user.id, track))
    use today <- result.try(today.today(
      context.db,
      user.id,
      track,
      profile,
      now,
    ))
    Ok(#(track, standings, profile, cards, drafts, notes, queues, today))
  }

  case result {
    Error(failure) -> study_error(failure)
    Ok(#(track, standings, profile, cards, drafts, notes, queues, today)) ->
      web.json_ok(
        json.object([
          #("now", json.float(fsrs.to_epoch(now))),
          #("user", wire.user_to_json(user)),
          #("account", wire.account_to_json(profile.account)),
          #("track", json.string(track)),
          #("tracks", json.array(standings, wire.track_standing_to_json)),
          // The fat pre-split object: every field both the old decoder and
          // the new one want, so a browser on the cached previous bundle
          // keeps working across the deploy.
          #(
            "settings",
            wire.legacy_settings_to_json(profile.account, profile.settings),
          ),
          #("cards", json.array(cards, card_json)),
          #("drafts", json.array(drafts, wire.draft_to_json)),
          #("notes", json.array(notes, wire.draft_to_json)),
          #("queues", json.array(queues, wire.queue_to_json)),
          #("today", wire.today_to_json(today)),
        ]),
      )
  }
}

/// The `?track=` parameter, when the request carries one.
fn query_track(request: wisp.Request) -> option.Option(String) {
  list.key_find(wisp.get_query(request), "track") |> option.from_result
}

/// GET and PUT /api/queues -- the user's named queues, as one set. The
/// client owns the list and sends it whole; the server checks its shape and
/// replaces what it had.
pub fn queues(request: wisp.Request, context: Context) -> wisp.Response {
  use user <- web.require_user(request, context)
  case request.method {
    http.Get ->
      case
        track.resolve(context.db, user.id, query_track(request))
        |> result.try(queues.load_queues_in(context.db, user.id, _))
      {
        Error(failure) -> study_error(failure)
        Ok(queues) -> web.json_ok(wire.queues_to_json(queues))
      }
    http.Put -> {
      use body <- wisp.require_json(request)
      case decode.run(body, wire.queues_decoder()) {
        Error(_) -> web.error(422, "invalid_body", "Expected a list of queues.")
        Ok(queues) -> {
          // The track travels with the set it scopes -- every queue names
          // its own -- rather than in the URL, so the two cannot disagree. A
          // PUT replaces exactly that track's queues and no other's. An
          // *empty* set names nothing, though, and that is the one case that
          // has to fall back to `?track=`: otherwise clearing a track's last
          // queue would silently delete nothing.
          let named = case queues {
            [] ->
              track.resolve(context.db, user.id, query_track(request))
              |> result.replace_error(Nil)
            _ -> track.one_track(queues)
          }
          case queues.validate_queues(queues), named {
            Error(message), _ -> web.error(422, "invalid_queues", message)
            _, Error(Nil) ->
              web.error(
                422,
                "mixed_tracks",
                "Every queue in one request must be in the same track.",
              )
            Ok(Nil), Ok(track) ->
              case queues.replace_queues(context.db, user.id, track, queues) {
                Error(failure) -> study_error(failure)
                Ok(Nil) -> wisp.no_content()
              }
          }
        }
      }
    }
    _ -> wisp.method_not_allowed([http.Get, http.Put])
  }
}

/// DELETE /api/reviews -- undo the most recent review. Same {now, card,
/// today} fold as recording one, except `card` is null when the review had
/// created the card and undoing it took the card out of the queue.
pub fn undo(request: wisp.Request, context: Context) -> wisp.Response {
  use user <- web.require_user(request, context)
  let now = timestamp.system_time()
  let assert Ok(track) =
    track.resolve(context.db, user.id, query_track(request))
  case reviews.undo_review(context.db, user.id, track) {
    Error(reviews.NothingToUndo) ->
      web.error(409, "nothing_to_undo", "There is no review to undo.")
    Error(reviews.UndoFailed(failure)) -> study_error(failure)
    Ok(reviews.Undone(card)) -> {
      let outcome = {
        use profile <- result.try(profile.load_profile(
          context.db,
          user.id,
          track,
        ))
        today.today(context.db, user.id, track, profile, now)
      }
      case outcome {
        Error(failure) -> study_error(failure)
        Ok(today) ->
          web.json_ok(
            json.object([
              #("now", json.float(fsrs.to_epoch(now))),
              #("card", case card {
                Some(record) -> card_json(record)
                None -> json.null()
              }),
              #("today", wire.today_to_json(today)),
            ]),
          )
      }
    }
  }
}

/// POST /api/reviews -- records one review. The scheduling decision is made
/// in `reviews.record_review` and nowhere else.
pub fn review(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Post)
  use user <- web.require_user(request, context)
  use body <- wisp.require_json(request)

  case decode.run(body, wire.review_decoder()) {
    Error(_) ->
      web.error(
        422,
        "invalid_body",
        "Expected a problem reference and a rating from 1 to 4.",
      )
    Ok(input) -> {
      let now = timestamp.system_time()
      let outcome = {
        // The ref carries the track, so a review needs no parameter: it is
        // scheduled under the settings of the track its own problem is in.
        let track = input.problem.category
        use profile <- result.try(profile.load_profile(
          context.db,
          user.id,
          track,
        ))
        use card <- result.try(reviews.record_review(
          context.db,
          user.id,
          profile.settings,
          input,
          now,
          fuzz_sample(),
        ))
        use today <- result.try(today.today(
          context.db,
          user.id,
          track,
          profile,
          now,
        ))
        Ok(#(card, today))
      }

      case outcome {
        Error(failure) -> study_error(failure)
        Ok(#(card, today)) ->
          web.json_ok(
            json.object([
              #("now", json.float(fsrs.to_epoch(now))),
              #("card", card_json(card)),
              #("today", wire.today_to_json(today)),
            ]),
          )
      }
    }
  }
}

/// Parks or resumes one card: PATCH /api/cards with a problem reference and
/// `suspended`. Answers the same {now, card, today} shape as a review, so the
/// client folds it with the same code.
pub fn suspend(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Patch)
  use user <- web.require_user(request, context)
  use body <- wisp.require_json(request)

  case decode.run(body, suspend_decoder()) {
    Error(_) ->
      web.error(
        422,
        "invalid_body",
        "Expected a problem reference and suspended: true or false.",
      )
    Ok(#(problem, suspended)) -> {
      let now = timestamp.system_time()
      let track = problem.category
      let outcome = {
        use profile <- result.try(profile.load_profile(
          context.db,
          user.id,
          track,
        ))
        use card <- result.try(cards.set_suspended(
          context.db,
          user.id,
          problem,
          suspended,
        ))
        use today <- result.try(today.today(
          context.db,
          user.id,
          track,
          profile,
          now,
        ))
        Ok(#(card, today))
      }

      case outcome {
        Error(failure) -> study_error(failure)
        Ok(#(None, _)) ->
          web.error(
            404,
            "unknown_card",
            "That problem has no scheduled card to suspend.",
          )
        Ok(#(Some(card), today)) ->
          web.json_ok(
            json.object([
              #("now", json.float(fsrs.to_epoch(now))),
              #("card", card_json(card)),
              #("today", wire.today_to_json(today)),
            ]),
          )
      }
    }
  }
}

fn suspend_decoder() -> decode.Decoder(#(wire.ProblemRef, Bool)) {
  use problem <- decode.then(wire.ref_decoder())
  use suspended <- decode.field("suspended", decode.bool)
  decode.success(#(problem, suspended))
}

/// Puts problems into the study queue. Bulk, because "add this whole topic" is
/// the normal case; the cap is what stops one request from seeding every
/// catalogue entry the app has.
pub fn enqueue(request: wisp.Request, context: Context) -> wisp.Response {
  use user <- web.require_user(request, context)
  use body <- wisp.require_json(request)

  case decode.run(body, queue_decoder()) {
    Error(_) -> invalid_queue_body()
    Ok([]) -> invalid_queue_body()
    Ok(problems) ->
      case list.length(problems) > validate.queue_batch_limit {
        True ->
          web.error(
            422,
            "too_many_problems",
            "Add at most "
              <> int.to_string(validate.queue_batch_limit)
              <> " problems at a time.",
          )
        False ->
          // One reply carries one `Today`, and there is no such thing as a
          // daily budget across two tracks, so a batch that spans them cannot
          // be answered honestly. Refusing beats picking one and being wrong.
          case track.batch_track(problems) {
            Error(Nil) ->
              web.error(
                422,
                "mixed_tracks",
                "Every problem in one request must be in the same track.",
              )
            Ok(track) ->
              queue_response(context, user, track, fn() {
                use cards <- result.try(cards.enqueue_cards(
                  context.db,
                  user.id,
                  problems,
                ))
                Ok(#(cards, [], []))
              })
          }
      }
  }
}

/// Takes problems out of the study queue.
///
/// A card that has been studied is refused rather than deleted -- its review
/// log cascades with it -- and comes back in `refused` so the client can park
/// it instead. That is a 200, not an error: a bulk removal of a topic where
/// three cards have history did remove the rest, and reporting the whole
/// request as failed would be a lie.
pub fn dequeue(request: wisp.Request, context: Context) -> wisp.Response {
  use user <- web.require_user(request, context)
  use body <- wisp.require_json(request)

  case decode.run(body, queue_decoder()) {
    Error(_) -> invalid_queue_body()
    Ok([]) -> invalid_queue_body()
    Ok(problems) ->
      case list.length(problems) > validate.queue_batch_limit {
        True ->
          web.error(
            422,
            "too_many_problems",
            "Remove at most "
              <> int.to_string(validate.queue_batch_limit)
              <> " problems at a time.",
          )
        False ->
          // One reply carries one `Today`, and there is no such thing as a
          // daily budget across two tracks, so a batch that spans them cannot
          // be answered honestly. Refusing beats picking one and being wrong.
          case track.batch_track(problems) {
            Error(Nil) ->
              web.error(
                422,
                "mixed_tracks",
                "Every problem in one request must be in the same track.",
              )
            Ok(track) ->
              queue_response(context, user, track, fn() {
                use pair <- result.try(cards.delete_cards(
                  context.db,
                  user.id,
                  problems,
                ))
                let #(removed, refused) = pair
                Ok(#([], removed, refused))
              })
          }
      }
  }
}

/// The shared tail of both queue endpoints: run the change, then answer with
/// the same four lists plus a freshly recomputed `today`, so the client's
/// counts move with the queue in one fold.
fn queue_response(
  context: Context,
  user: wire.User,
  track: String,
  change: fn() ->
    Result(
      #(List(CardRecord), List(wire.ProblemRef), List(wire.ProblemRef)),
      model.StudyError,
    ),
) -> wisp.Response {
  let now = timestamp.system_time()
  let outcome = {
    use profile <- result.try(profile.load_profile(context.db, user.id, track))
    use #(cards, removed, refused) <- result.try(change())
    use today <- result.try(today.today(
      context.db,
      user.id,
      track,
      profile,
      now,
    ))
    Ok(#(cards, removed, refused, today))
  }

  case outcome {
    Error(failure) -> study_error(failure)
    Ok(#(cards, removed, refused, today)) ->
      web.json_ok(
        json.object([
          #("now", json.float(fsrs.to_epoch(now))),
          #("cards", json.array(cards, card_json)),
          #("removed", json.array(removed, wire.ref_to_json)),
          #("refused", json.array(refused, wire.ref_to_json)),
          #("today", wire.today_to_json(today)),
        ]),
      )
  }
}

fn invalid_queue_body() -> wisp.Response {
  web.error(
    422,
    "invalid_body",
    "Expected problems: a non-empty list of problem references.",
  )
}

fn queue_decoder() -> decode.Decoder(List(wire.ProblemRef)) {
  use problems <- decode.field("problems", decode.list(wire.ref_decoder()))
  decode.success(problems)
}

pub fn stats(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Get)
  use user <- web.require_user(request, context)

  let outcome = {
    use account <- result.try(profile.load_account(context.db, user.id))
    use track <- result.try(track.resolve(
      context.db,
      user.id,
      query_track(request),
    ))
    stats.stats(context.db, user.id, track, account)
  }

  case outcome {
    Error(failure) -> study_error(failure)
    Ok(stats) -> web.json_ok(wire.stats_to_json(stats))
  }
}

/// One-time migration of a returning user's localStorage.
///
/// Idempotent by construction: seeding skips problems that already have a
/// card, so a client that retries cannot clobber real scheduling.
pub fn import_legacy(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Post)
  use user <- web.require_user(request, context)
  use body <- wisp.require_json(request)

  case decode.run(body, import_decoder()) {
    Error(_) ->
      web.error(
        422,
        "invalid_body",
        "Expected cards, solved problems and drafts.",
      )
    Ok(#(solved, cards, drafts, notes, queues)) -> {
      let outcome = {
        // A legacy import is one track's worth by construction: the
        // pre-account store only ever held Python.
        // An upgrade hands over one track's worth by construction: the
        // pre-account store only ever held Python. Anything in the payload
        // that names no track is attributed to this one.
        use track <- result.try(
          track.batch_track(solved)
          |> result.try_recover(fn(_) {
            profile.default_track(context.db, user.id)
            |> result.map_error(fn(_) { Nil })
          })
          |> result.unwrap("")
          |> Ok,
        )
        use profile <- result.try(profile.load_profile(
          context.db,
          user.id,
          track,
        ))
        legacy_import.import_legacy(
          context.db,
          user.id,
          track,
          profile.settings,
          solved,
          cards,
          drafts,
          notes,
          queues,
          timestamp.system_time(),
        )
      }
      case outcome {
        Error(failure) -> study_error(failure)
        Ok(Nil) -> wisp.no_content()
      }
    }
  }
}

pub fn insights(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Get)
  use user <- web.require_user(request, context)

  case
    track.resolve(context.db, user.id, query_track(request))
    |> result.try(insights.insights(context.db, user.id, _))
  {
    Error(failure) -> study_error(failure)
    Ok(insights) -> web.json_ok(wire.insights_to_json(insights))
  }
}

/// One card's full review log, addressed by query parameters — the problem key
/// is three free-text fields, and burying them in a path would mean escaping
/// "Arrays & Hashing" into it.
pub fn history(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Get)
  use user <- web.require_user(request, context)

  let query = wisp.get_query(request)
  case
    list.key_find(query, "category"),
    list.key_find(query, "subcategory"),
    list.key_find(query, "title")
  {
    Ok(category), Ok(subcategory), Ok(title) ->
      case
        insights.history(
          context.db,
          user.id,
          wire.ProblemRef(category:, subcategory:, title:),
        )
      {
        Error(failure) -> study_error(failure)
        Ok(reviews) ->
          web.json_ok(
            json.object([
              #("reviews", json.array(reviews, wire.review_row_to_json)),
            ]),
          )
      }
    _, _, _ ->
      web.error(
        422,
        "invalid_query",
        "Expected category, subcategory and title query parameters.",
      )
  }
}

/// GET /api/export -- everything the account holds, as one archive.
pub fn export(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Get)
  use user <- web.require_user(request, context)
  let outcome = {
    use account <- result.try(profile.load_account(context.db, user.id))
    use tracks <- result.try(profile.all_track_settings(context.db, user.id))
    use cards <- result.try(cards.load_cards(context.db, user.id))
    use reviews <- result.try(archive.all_reviews(context.db, user.id))
    use drafts <- result.try(drafts.load_drafts(context.db, user.id))
    use notes <- result.try(notes.load_notes(context.db, user.id))
    use queues <- result.try(queues.load_queues(context.db, user.id))
    // The whole account, every track: an archive is the backup, and a
    // per-track file would make "restore everything" an N-file operation
    // with a partial restore as its failure mode.
    Ok(wire.Archive(
      version: wire.archive_version,
      exported_at: timestamp.system_time(),
      account:,
      tracks:,
      cards: list.map(cards, model.to_state),
      reviews:,
      drafts:,
      notes:,
      queues:,
    ))
  }
  case outcome {
    Error(failure) -> study_error(failure)
    Ok(archive) -> web.json_ok(wire.archive_to_json(archive))
  }
}

/// POST /api/restore -- replace everything with an archive. The client asks
/// before sending; the server only checks the file is one of ours and, for
/// scheduler settings, one it would have accepted from the settings form.
pub fn restore(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Post)
  use user <- web.require_user(request, context)
  use body <- wisp.require_json(request)
  case decode.run(body, wire.archive_decoder()) {
    Error(_) ->
      web.error(422, "invalid_body", "That is not a GleamDrill export.")
    Ok(archive) ->
      // Older files are fine: each decoder defaults what its version lacks.
      case archive.version <= wire.archive_version {
        False ->
          web.error(
            422,
            "unsupported_version",
            "This export was made by a newer GleamDrill.",
          )
        True -> {
          // An archive carries a settings blob per track and one account
          // object; both halves face the same bounds a settings form does,
          // because a file is just as able to hold an hour of 47.
          let restored = archive.archive_profile(archive)
          case
            validate.settings(restored.settings),
            validate.account(restored.account),
            queues.validate_queues(archive.queues)
          {
            Error(message), _, _ | _, Error(message), _ ->
              web.error(422, "invalid_settings", message)
            _, _, Error(message) -> web.error(422, "invalid_queues", message)
            Ok(_), Ok(_), Ok(_) ->
              case
                today.timezone_is_valid(context.db, restored.account.timezone)
              {
                Ok(False) ->
                  web.error(422, "invalid_settings", "Unknown timezone.")
                Error(failure) -> study_error(failure)
                Ok(True) ->
                  case archive.restore(context.db, user.id, archive) {
                    Error(failure) -> study_error(failure)
                    Ok(Nil) -> wisp.no_content()
                  }
              }
          }
        }
      }
  }
}

/// PUT /api/notes -- the user's note on one problem. Same payload as a
/// draft; an empty body clears it.
pub fn note(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Put)
  use user <- web.require_user(request, context)
  use body <- wisp.require_json(request)

  case decode.run(body, wire.draft_decoder()) {
    Error(_) ->
      web.error(422, "invalid_body", "Expected a problem reference and a body.")
    Ok(#(problem, note_body)) ->
      case notes.save_note(context.db, user.id, problem, note_body) {
        Error(failure) -> study_error(failure)
        Ok(Nil) -> wisp.no_content()
      }
  }
}

pub fn draft(request: wisp.Request, context: Context) -> wisp.Response {
  use user <- web.require_user(request, context)
  case request.method {
    http.Put -> {
      use body <- wisp.require_json(request)
      case decode.run(body, wire.draft_decoder()) {
        Error(_) ->
          web.error(
            422,
            "invalid_body",
            "Expected a problem reference and a body.",
          )
        Ok(#(problem, draft_body)) ->
          case drafts.save_draft(context.db, user.id, problem, draft_body) {
            Error(failure) -> study_error(failure)
            Ok(Nil) -> wisp.no_content()
          }
      }
    }
    // A draft dropped without a review: a Blitz card that ran out of time.
    // Graded problems lose theirs inside the review transaction instead.
    http.Delete -> {
      use body <- wisp.require_json(request)
      case decode.run(body, wire.ref_decoder()) {
        Error(_) ->
          web.error(422, "invalid_body", "Expected a problem reference.")
        Ok(problem) ->
          case drafts.delete_draft(context.db, user.id, problem) {
            Error(failure) -> study_error(failure)
            Ok(Nil) -> wisp.no_content()
          }
      }
    }
    _ -> wisp.method_not_allowed([http.Put, http.Delete])
  }
}

pub fn settings(request: wisp.Request, context: Context) -> wisp.Response {
  use user <- web.require_user(request, context)
  case request.method {
    http.Get ->
      case
        track.resolve(context.db, user.id, query_track(request))
        |> result.try(profile.load_profile(context.db, user.id, _))
      {
        Error(failure) -> study_error(failure)
        Ok(profile) -> web.json_ok(profile_json(profile))
      }
    http.Put -> update_settings(request, context, user)
    _ -> wisp.method_not_allowed([http.Get, http.Put])
  }
}

fn update_settings(
  request: wisp.Request,
  context: Context,
  user: wire.User,
) -> wisp.Response {
  use body <- wisp.require_json(request)
  // One flat object still, holding both halves. It splits into two decodes
  // rather than one because the two halves are two records now.
  case
    decode.run(body, wire.settings_decoder()),
    decode.run(body, wire.account_decoder())
  {
    Error(_), _ | _, Error(_) ->
      web.error(422, "invalid_body", "Expected a settings object.")
    Ok(settings), Ok(account) ->
      case validate.settings(settings), validate.account(account) {
        Error(message), _ | _, Error(message) ->
          web.error(422, "invalid_settings", message)
        Ok(settings), Ok(account) ->
          case today.timezone_is_valid(context.db, account.timezone) {
            Error(failure) -> study_error(failure)
            Ok(False) ->
              web.error(
                422,
                "invalid_settings",
                "Unknown timezone: " <> account.timezone <> ".",
              )
            Ok(True) -> {
              let profile = wire.Profile(account:, settings:)
              let assert Ok(track) =
                track.resolve(context.db, user.id, query_track(request))
              // Both halves still arrive in one object, so both are written:
              // the account's row, and this track's. Splitting the endpoint
              // is a later release's business.
              let written = {
                use _ <- result.try(profile.save_account(
                  context.db,
                  user.id,
                  account,
                ))
                profile.save_settings(context.db, user.id, track, settings)
              }
              case written {
                Error(failure) -> study_error(failure)
                Ok(Nil) -> web.json_ok(profile_json(profile))
              }
            }
          }
      }
  }
}

fn profile_json(profile: wire.Profile) -> Json {
  json.object([
    #("account", wire.account_to_json(profile.account)),
    #(
      "settings",
      wire.legacy_settings_to_json(profile.account, profile.settings),
    ),
  ])
}

// --- fuzz ------------------------------------------------------------------

/// The scheduler takes its fuzz sample as an argument so it can stay pure;
/// this is where the randomness actually enters the system.
fn fuzz_sample() -> Float {
  let assert <<value:size(32)>> = crypto.strong_random_bytes(4)
  int.to_float(value) /. 4_294_967_296.0
}

// --- encoding --------------------------------------------------------------

fn card_json(record: CardRecord) -> Json {
  wire.card_to_json(model.to_state(record))
}

// --- decoding --------------------------------------------------------------

fn import_decoder() -> decode.Decoder(
  #(
    List(wire.ProblemRef),
    List(legacy_import.ImportCard),
    List(#(wire.ProblemRef, String)),
    List(#(wire.ProblemRef, String)),
    List(wire.Queue),
  ),
) {
  // `solved` is the pre-account localStorage format (a sticky boolean, no
  // dates); `cards` is guest-mode state with real scheduling. Both are
  // optional so either migration can post only what it has.
  use solved <- decode.optional_field(
    "solved",
    [],
    decode.list(wire.ref_decoder()),
  )
  use cards <- decode.optional_field(
    "cards",
    [],
    decode.list(import_card_decoder()),
  )
  use drafts <- decode.optional_field(
    "drafts",
    [],
    decode.list(wire.draft_decoder()),
  )
  use notes <- decode.optional_field(
    "notes",
    [],
    decode.list(wire.draft_decoder()),
  )
  use queues <- decode.optional_field(
    "queues",
    [],
    decode.list(wire.queue_decoder()),
  )
  decode.success(#(solved, cards, drafts, notes, queues))
}

fn import_card_decoder() -> decode.Decoder(legacy_import.ImportCard) {
  use problem <- decode.then(wire.ref_decoder())
  use state <- decode.field("state", decode.int)
  use step <- decode.field("step", decode.optional(decode.int))
  use stability <- decode.field(
    "stability",
    decode.optional(wire.lenient_float()),
  )
  use difficulty <- decode.field(
    "difficulty",
    decode.optional(wire.lenient_float()),
  )
  use due <- decode.field("due", wire.lenient_float())
  use last_review <- decode.field(
    "lastReview",
    decode.optional(wire.lenient_float()),
  )
  use reps <- decode.field("reps", decode.int)
  use lapses <- decode.field("lapses", decode.int)
  use introduced_at <- decode.optional_field(
    "introducedAt",
    None,
    decode.optional(wire.lenient_float()),
  )
  decode.success(legacy_import.ImportCard(
    problem:,
    // Anything outside 1..3 would violate the state encoding, so it is
    // clamped rather than trusted.
    state: int.clamp(state, 1, 3),
    step:,
    memory: case stability, difficulty {
      Some(stability), Some(difficulty) ->
        Some(fsrs.Memory(stability:, difficulty:))
      _, _ -> None
    },
    due: fsrs.from_epoch(due),
    last_review: option.map(last_review, fsrs.from_epoch),
    reps: int.max(0, reps),
    lapses: int.max(0, lapses),
    introduced_at: option.map(introduced_at, fsrs.from_epoch),
  ))
}

// --- errors ----------------------------------------------------------------

fn study_error(failure: model.StudyError) -> wisp.Response {
  case failure {
    model.StudyDatabaseError(detail) -> {
      wisp.log_error("study database error: " <> detail)
      web.error(500, "server_error", "Something went wrong. Try again.")
    }
  }
}
