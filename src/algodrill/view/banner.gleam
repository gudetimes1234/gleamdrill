//// Banners that must be visible wherever the user happens to be.

import algodrill/model.{type Model, type Msg, Registering, UserClickedSignIn}
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

/// A failed local write means progress is silently not being kept.
///
/// Rendered on the drill screen as well as the study screen deliberately: a
/// guest grinding a twenty-card session would otherwise not find out until
/// they finished, by which point the whole session is gone. It is also not
/// dismissible -- the condition persists, so dismissing it would only hide it.
pub fn storage_warning(m: Model) -> Element(Msg) {
  case m.storage_full {
    False -> element.none()
    True ->
      html.div([attribute.class("storage-warning"), attribute.role("alert")], [
        html.span([attribute.class("notice-text")], [
          html.text(
            "This browser's storage is full. Your progress is no longer being saved.",
          ),
        ]),
        html.button(
          [
            attribute.class("guest-strip-action"),
            event.on_click(UserClickedSignIn(Registering)),
          ],
          [html.text("Create an account")],
        ),
      ])
  }
}
