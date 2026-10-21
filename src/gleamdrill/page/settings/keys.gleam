//// The settings page's keys. While the import question is up it owns the
//// keyboard, the same way round as the drill's exit prompt: Enter
//// replaces, Escape keeps yours.

import gleam/option.{None, Some}
import gleamdrill/page/settings/model.{type Model}
import gleamdrill/page/settings/msg.{
  type Msg, ImportConfirmed, UserClickedBack, UserToggledHelp,
}
import gleamdrill/shared.{type Shared}
import gleamdrill/ui/binding.{type Binding, Binding}

pub const label = "SETTINGS"

pub fn bindings(_shared: Shared, page: Model) -> List(Binding(Msg)) {
  case page.import_pending {
    Some(_) -> [
      Binding(["Enter"], "replace", "Replace everything", ImportConfirmed(True)),
      Binding(["Escape"], "keep", "Keep what is here", ImportConfirmed(False)),
    ]
    None -> [
      Binding(["Escape", "b"], "back", "Back to study", UserClickedBack),
      Binding(["?"], "keys", "This cheatsheet", UserToggledHelp),
    ]
  }
}
