//// The track switcher's keys. There is no study screen to go back to until
//// a track has been chosen.

import gleamdrill/page/tracks/model.{type Model}
import gleamdrill/page/tracks/msg.{type Msg, UserClickedBack, UserToggledHelp}
import gleamdrill/shared.{type Shared}
import gleamdrill/ui/binding.{type Binding, Binding}

pub const label = "TRACKS"

pub fn bindings(shared: Shared, _page: Model) -> List(Binding(Msg)) {
  let help = Binding(["?"], "keys", "This cheatsheet", UserToggledHelp)
  case shared.active_track {
    "" -> [help]
    _ -> [
      Binding(["Escape", "b"], "back", "Back to study", UserClickedBack),
      help,
    ]
  }
}
