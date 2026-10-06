//// The track switcher, and the app's landing page.
////
//// Study, Queue and Stats are all *inside* a track now, so this is where one
//// is chosen. It doubles as the first-run screen: a browser with no track yet
//// lands here, which is the same question the language picker used to ask and
//// one fewer screen to ask it on.
////
//// The rows are the catalogue's tracks *plus* any track the user actually has
//// cards in, which is not always a subset. The server validates nothing about
//// a category string and ships no catalogue, so a track holding real cards
//// under a name this bundle no longer has -- a renamed category, a stale
//// offline cache -- would otherwise be unreachable. Showing it turns silent
//// loss into a visible oddity.

import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleamdrill/model.{
  type Model, type Msg, UserPickedTrack, UserPickedTrackWithStarter,
}
import gleamdrill/track
import gleamdrill/view/banner
import gleamdrill/view/brand
import gleamdrill/view/nav
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event
import wire

pub fn view(m: Model) -> Element(Msg) {
  let rows = rows(m)
  html.div([attribute.class("tracks-screen")], [
    banner.storage_warning(m),
    nav.notices(m),
    html.header([attribute.class("study-header")], [
      html.h1([attribute.class("study-title")], brand.wordmark()),
      nav.bar(m, model.TracksRoute),
    ]),
    html.p([attribute.class("tracks-lead")], [
      html.text(case m.active_track {
        "" ->
          "Pick a track. Everything after this — what is due, what you queue, "
          <> "what the stats say — is that track's alone."
        _ ->
          "One track at a time. Switching loses nothing: each keeps its own "
          <> "queue, its own limits and its own history."
      }),
    ]),
    html.div(
      [attribute.class("track-cards")],
      list.map(rows, fn(row) { card(m, row) }),
    ),
  ])
}

/// One track and what is known about it. `standing` is absent for a track the
/// user has never touched -- which is not zero, it is nothing yet, and the
/// card says so rather than showing three noughts.
type Row {
  Row(track: String, standing: Option(wire.TrackStanding))
}

fn rows(m: Model) -> List(Row) {
  let known = list.map(m.tracks, fn(s: wire.TrackStanding) { s.track })
  // The catalogue's order first, because it is the curriculum's; then
  // anything the user has that the catalogue does not.
  let extra = list.filter(known, fn(name) { !track.exists(name) })
  list.append(track.all(), extra)
  |> list.map(fn(name) {
    Row(
      track: name,
      standing: list.find(m.tracks, fn(s: wire.TrackStanding) {
        s.track == name
      })
        |> option.from_result,
    )
  })
}

fn card(m: Model, row: Row) -> Element(Msg) {
  let here = row.track == m.active_track
  let unknown = !track.exists(row.track)
  html.div(
    [
      attribute.classes([
        #("track-card", True),
        #("current", here),
        #("stranded", unknown),
      ]),
    ],
    [
      html.button(
        [
          attribute.class("link-button track-card-open"),
          attribute.type_("button"),
          event.on_click(UserPickedTrack(row.track)),
        ],
        [
          html.span([attribute.class("track-card-name")], [
            html.text(track.label(row.track)),
          ]),
          html.span([attribute.class("track-card-tag")], [
            html.text(track.tag(row.track)),
          ]),
        ],
      ),
      ..body(m, row, unknown)
    ],
  )
}

fn body(m: Model, row: Row, unknown: Bool) -> List(Element(Msg)) {
  case row.standing {
    // Nothing here yet. Offer the one thing that makes the track usable in a
    // click, rather than sending someone to the queue screen to find out what
    // twenty problems to pick.
    None -> [
      html.p([attribute.class("track-card-empty")], [
        html.text("Nothing queued yet."),
      ]),
      html.button(
        [
          attribute.class("btn-secondary track-card-starter"),
          attribute.type_("button"),
          event.on_click(UserPickedTrackWithStarter(row.track)),
        ],
        [html.text("Start with twenty easy ones")],
      ),
    ]
    Some(standing) ->
      list.flatten([
        [
          html.div([attribute.class("track-card-counts")], [
            count("Due", standing.due_now),
            count("New", new_remaining(standing)),
            count("Cards", standing.cards),
          ]),
        ],
        case unknown {
          False -> []
          // Said out loud rather than hidden: these cards are real and the
          // schedule behind them is real, but no drill in this bundle matches
          // them, so nothing here can open one.
          True -> [
            html.p([attribute.class("track-card-stranded")], [
              html.text(
                "This browser has cards under a name the catalogue no longer "
                <> "has. They are safe, but nothing here can open them.",
              ),
            ]),
          ]
        },
        case standing.reviews_today {
          0 -> []
          done -> [
            html.p([attribute.class("track-card-done")], [
              html.text(int.to_string(done) <> " done today"),
            ]),
          ]
        },
        case m.stats {
          Some(_) if row.track == m.active_track -> [
            html.button(
              [
                attribute.class("link-button track-card-stats"),
                attribute.type_("button"),
                event.on_click(model.UserClickedStats),
              ],
              [html.text("Stats \u{2192}")],
            ),
          ]
          _ -> []
        },
      ])
  }
}

/// What is left of today's new-card budget in this track, which is the number
/// a sitting would actually serve -- not the whole pile waiting behind it.
fn new_remaining(standing: wire.TrackStanding) -> Int {
  int.max(0, standing.settings.new_per_day - standing.introduced_today)
}

fn count(label: String, value: Int) -> Element(Msg) {
  html.div([attribute.class("track-count")], [
    html.span([attribute.class("track-count-value")], [
      html.text(int.to_string(value)),
    ]),
    html.span([attribute.class("track-count-label")], [html.text(label)]),
  ])
}

/// The label the status bar and the nav use for wherever you are.
pub fn active_label(m: Model) -> String {
  case m.active_track {
    "" -> "No track"
    name -> track.label(name)
  }
}
