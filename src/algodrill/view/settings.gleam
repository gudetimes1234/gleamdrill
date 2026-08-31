//// The scheduler knobs, and the device preferences that sit beside them.
////
//// Two kinds of setting share this screen and they persist differently. The
//// scheduler ones are account data and go through `store`, so they follow you
//// between browsers once you have an account. The keymap and the language
//// filter belong to the device and go to localStorage whatever your mode is.
//// The screen says which is which rather than pretending they are the same.
////
//// Every input commits on blur or Enter (`on_change`, not `on_input`), and
//// saving is immediate: there is no Save button to forget to press, and no
//// draft copy of the settings to keep in sync with the real one.

import algodrill/model.{
  type Model, type Msg, DayStartHour, DesiredRetention, NewPerDay, ReviewsPerDay,
  UserChangedKeymap, UserChangedSetting, UserClickedBackToStudy,
  UserClickedDeviceTimezone, UserToggledLanguage,
}
import algodrill/problems
import gleam/float
import gleam/int
import gleam/list
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

pub fn view(m: Model) -> Element(Msg) {
  let settings = m.settings

  html.div([attribute.class("settings-screen")], [
    html.header([attribute.class("study-header")], [
      html.button(
        [
          attribute.class("btn-secondary"),
          event.on_click(UserClickedBackToStudy),
        ],
        [html.text("\u{2190} Back")],
      ),
      html.h1([attribute.class("study-title")], [html.text("Settings")]),
    ]),

    section("Daily limits", "Kept with your account.", [
      number_row(
        "New problems per day",
        "How many unseen problems the queue introduces. These are the "
          <> "expensive ones: a first encounter is read, thought about and "
          <> "typed from nothing.",
        NewPerDay,
        int.to_string(settings.new_per_day),
        "0",
        "100",
        "1",
      ),
      number_row(
        "Reviews per day",
        "The cap on problems already seen. A review here is minutes, not "
          <> "seconds, so this is a time budget wearing a card count.",
        ReviewsPerDay,
        int.to_string(settings.reviews_per_day),
        "0",
        "500",
        "1",
      ),
    ]),

    section(
      "Scheduling",
      "FSRS decides when a problem comes back. These change how it decides.",
      [
        number_row(
          "Target retention",
          "The share of reviews you want to pass. Higher means shorter "
            <> "intervals and more work for the same material; 0.9 is the "
            <> "default and is a good place to stay.",
          DesiredRetention,
          float.to_string(settings.scheduler.desired_retention),
          "0.7",
          "0.99",
          "0.01",
        ),
        number_row(
          "Day starts at",
          "The hour your study day rolls over, in local time. 4am by "
            <> "default, so a late-night session counts toward the day it "
            <> "feels like rather than the one the clock says.",
          DayStartHour,
          int.to_string(settings.day_start_hour),
          "0",
          "23",
          "1",
        ),
        timezone_row(settings.timezone),
      ],
    ),

    section("This device", "Kept in this browser, signed in or not.", [
      keymap_row(m),
      languages_row(m),
    ]),
  ])
}

fn section(
  title: String,
  note: String,
  rows: List(Element(Msg)),
) -> Element(Msg) {
  html.section([attribute.class("settings-section")], [
    html.h2([attribute.class("study-section-title")], [html.text(title)]),
    html.p([attribute.class("settings-section-note")], [html.text(note)]),
    html.div([attribute.class("settings-rows")], rows),
  ])
}

fn number_row(
  label: String,
  help: String,
  field: model.SettingField,
  value: String,
  min: String,
  max: String,
  step: String,
) -> Element(Msg) {
  html.div([attribute.class("settings-row")], [
    html.div([attribute.class("settings-label")], [
      html.span([attribute.class("settings-label-text")], [html.text(label)]),
      html.span([attribute.class("settings-help")], [html.text(help)]),
    ]),
    html.input([
      attribute.class("settings-input"),
      attribute.type_("number"),
      attribute.min(min),
      attribute.max(max),
      attribute.step(step),
      attribute.value(value),
      event.on_change(UserChangedSetting(field, _)),
    ]),
  ])
}

/// No IANA list: the server validates against `pg_timezone_names`, and the
/// only case that actually happens is having moved, which the browser already
/// knows the answer to.
fn timezone_row(timezone: String) -> Element(Msg) {
  html.div([attribute.class("settings-row")], [
    html.div([attribute.class("settings-label")], [
      html.span([attribute.class("settings-label-text")], [
        html.text("Timezone"),
      ]),
      html.span([attribute.class("settings-help")], [
        html.text(
          "Set when you signed up. Change it if you have moved, or the day "
          <> "will roll over at the wrong hour.",
        ),
      ]),
    ]),
    html.div([attribute.class("settings-timezone")], [
      html.span([attribute.class("settings-timezone-value")], [
        html.text(timezone),
      ]),
      html.button(
        [
          attribute.class("btn-secondary"),
          event.on_click(UserClickedDeviceTimezone),
        ],
        [html.text("Use this device's")],
      ),
    ]),
  ])
}

fn keymap_row(m: Model) -> Element(Msg) {
  html.div([attribute.class("settings-row")], [
    html.div([attribute.class("settings-label")], [
      html.span([attribute.class("settings-label-text")], [
        html.text("Editor keys"),
      ]),
      html.span([attribute.class("settings-help")], [
        html.text("Also switchable from the drill screen's header."),
      ]),
    ]),
    html.div(
      [attribute.class("keymap-picker")],
      list.map(
        [#("default", "Std"), #("vim", "Vim"), #("emacs", "Emacs")],
        fn(mode) {
          html.button(
            [
              attribute.classes([
                #("keymap-option", True),
                #("active", m.editor_keymap == mode.0),
              ]),
              event.on_click(UserChangedKeymap(mode.0)),
            ],
            [html.text(mode.1)],
          )
        },
      ),
    ),
  ])
}

fn languages_row(m: Model) -> Element(Msg) {
  html.div([attribute.class("settings-row")], [
    html.div([attribute.class("settings-label")], [
      html.span([attribute.class("settings-label-text")], [
        html.text("Languages"),
      ]),
      html.span([attribute.class("settings-help")], [
        html.text(
          "Muting one keeps its cards out of the queue without penalty: they "
          <> "wait, and are rescheduled from real elapsed time whenever you "
          <> "come back to them.",
        ),
      ]),
    ]),
    html.div(
      [attribute.class("language-chips")],
      list.map(problems.language_options(), fn(option) {
        let #(tag, label) = option
        let muted = model.language_muted(m, tag)
        html.button(
          [
            attribute.classes([#("language-chip", True), #("muted", muted)]),
            event.on_click(UserToggledLanguage(tag)),
          ],
          [html.text(label)],
        )
      }),
    ),
  ])
}
