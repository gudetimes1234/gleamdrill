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

import gleam/float
import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleamdrill/model.{
  type Model, type Msg, DayStartHour, DesiredRetention, ImportConfirmed,
  NewPerDay, ReminderHour, ReviewsPerDay, UserChangedKeymap, UserChangedSetting,
  UserClickedDeviceTimezone, UserClickedExport, UserClickedImport,
  UserClickedWarmCache,
}
import gleamdrill/view/nav
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

pub fn view(m: Model) -> Element(Msg) {
  let settings = m.settings

  html.div([attribute.class("settings-screen")], [
    nav.notices(m),
    html.header([attribute.class("study-header")], [
      html.h1([attribute.class("study-title")], [html.text("Settings")]),
      nav.bar(m, model.SettingsRoute),
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

    section(
      "Reminders",
      "One plain mail on the days something is due, at the hour you pick "
        <> "in your timezone. Nothing on days with nothing due.",
      [reminder_row(m)],
    ),

    section("This device", "Kept in this browser, signed in or not.", [
      keymap_row(m),
      offline_row(m),
    ]),

    section(
      "Your data",
      case m.mode {
        model.Guest ->
          "Everything this browser holds, as one file. Import it on "
          <> "another device, or keep it as a backup."
        model.Account(_) ->
          "Everything your account holds, as one file. The same file "
          <> "restores into a guest browser, and a guest's file into an account."
      },
      [
        action_row(
          "Export study data",
          "Cards, every review, settings, drafts and notes, as JSON.",
          "Download",
          "settings-export",
          UserClickedExport,
        ),
        action_row(
          "Import study data",
          "Replaces everything here with the file's contents. You are asked "
            <> "first.",
          "Choose file\u{2026}",
          "settings-import",
          UserClickedImport,
        ),
      ],
    ),
    import_prompt(m),
  ])
}

/// The offline cache: how much of the runtimes this browser already holds,
/// and a button to fetch the rest so a sitting works with no network.
fn offline_row(m: Model) -> Element(Msg) {
  let held = case m.cache_bytes {
    0 -> "Nothing cached yet."
    bytes -> megabytes(bytes) <> " cached."
  }
  html.div([attribute.class("settings-row")], [
    html.div([attribute.class("settings-label")], [
      html.span([attribute.class("settings-label-text")], [
        html.text("Offline runtimes"),
      ]),
      html.span([attribute.class("settings-help")], [
        html.text(
          "The Gleam compiler and the Python runtime, about 11 MB, so a "
          <> "guest sitting runs with no network. They also fill in as "
          <> "you use them. "
          <> held,
        ),
      ]),
    ]),
    case m.warming {
      Some(#(done, total)) ->
        html.span([attribute.class("settings-progress")], [
          html.text(
            "Downloading\u{2026} "
            <> int.to_string(done)
            <> "/"
            <> int.to_string(total),
          ),
        ])
      None ->
        html.button(
          [
            attribute.class("btn-secondary settings-warm"),
            attribute.type_("button"),
            event.on_click(UserClickedWarmCache),
          ],
          [html.text("Download all")],
        )
    },
  ])
}

fn megabytes(bytes: Int) -> String {
  let tenths = bytes / 100_000
  int.to_string(tenths / 10) <> "." <> int.to_string(tenths % 10) <> " MB"
}

fn action_row(
  label: String,
  help: String,
  button: String,
  class: String,
  msg: Msg,
) -> Element(Msg) {
  html.div([attribute.class("settings-row")], [
    html.div([attribute.class("settings-label")], [
      html.span([attribute.class("settings-label-text")], [html.text(label)]),
      html.span([attribute.class("settings-help")], [html.text(help)]),
    ]),
    html.button(
      [
        attribute.class("btn-secondary " <> class),
        attribute.type_("button"),
        event.on_click(msg),
      ],
      [html.text(button)],
    ),
  ])
}

/// The "replace everything?" question, over the settings it will change.
/// Same markup as the drill's exit prompt, so it reads and keys the same.
fn import_prompt(m: Model) -> Element(Msg) {
  case m.import_pending {
    None -> element.none()
    Some(archive) ->
      html.div([attribute.class("exit-overlay")], [
        html.div(
          [
            attribute.class("exit-prompt import-prompt"),
            attribute.role("dialog"),
            attribute.attribute("aria-modal", "true"),
            attribute.attribute("aria-labelledby", "import-prompt-title"),
          ],
          [
            html.p(
              [
                attribute.class("exit-prompt-title"),
                attribute.id("import-prompt-title"),
              ],
              [
                html.text(
                  "Replace everything here with this file? It holds "
                  <> int.to_string(list.length(archive.cards))
                  <> " cards and "
                  <> int.to_string(list.length(archive.reviews))
                  <> " reviews. What is here now is gone for good.",
                ),
              ],
            ),
            html.div([attribute.class("exit-prompt-actions")], [
              html.button(
                [
                  attribute.class("btn-primary exit-prompt-leave"),
                  event.on_click(ImportConfirmed(True)),
                ],
                [html.text("Replace")],
              ),
              html.button(
                [
                  attribute.class("btn-secondary exit-prompt-stay"),
                  event.on_click(ImportConfirmed(False)),
                ],
                [html.text("Keep mine")],
              ),
            ]),
          ],
        ),
      ])
  }
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

/// The reminder hour, as a select: off, or any hour of the day. A guest has
/// no address, so the control is shown but disabled with the reason.
fn reminder_row(m: Model) -> Element(Msg) {
  let signed_in = case m.mode {
    model.Account(_) -> True
    model.Guest -> False
  }
  let current = case m.settings.reminder_hour {
    Some(hour) -> int.to_string(hour)
    None -> "off"
  }
  let option = fn(value, label) {
    html.option(
      [attribute.value(value), attribute.selected(value == current)],
      label,
    )
  }
  html.div([attribute.class("settings-row")], [
    html.div([attribute.class("settings-label")], [
      html.span([attribute.class("settings-label-text")], [
        html.text("Daily reminder"),
      ]),
      html.span([attribute.class("settings-help")], [
        html.text(case signed_in {
          True -> "Sent to " <> user_email(m) <> "."
          False -> "Sign in to get reminders: a guest has no address."
        }),
      ]),
    ]),
    html.select(
      [
        attribute.class("settings-input settings-select settings-reminder"),
        attribute.disabled(!signed_in),
        event.on_change(UserChangedSetting(ReminderHour, _)),
      ],
      [
        option("off", "Off"),
        ..list.map(hours, fn(hour) {
          option(int.to_string(hour), hour_label(hour))
        })
      ],
    ),
  ])
}

const hours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
]

fn user_email(m: Model) -> String {
  case m.user {
    Some(user) -> user.email
    None -> "your address"
  }
}

fn hour_label(hour: Int) -> String {
  case hour {
    0 -> "12 am"
    12 -> "12 pm"
    h if h < 12 -> int.to_string(h) <> " am"
    h -> int.to_string(h - 12) <> " pm"
  }
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
