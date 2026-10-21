//// What every page reads: the session, the active track and its data, the
//// device preferences and the chrome. Pages get it read-only and ask for
//// changes by returning `Change`s, which the app applies (Elm's "OutMsg").
////
//// While pages move out of the flat model one by one, `Shared` is that
//// model: each migrated page takes its own fields with it, and what is left
//// at the end is exactly the shared state, renamed into a record of its own.

import gleamdrill/model
import gleamdrill/msg
import wire

pub type Shared =
  model.Model

/// What a page asks of the shared state. The app applies these after the
/// page's own update, so a page never writes shared state directly.
pub type Change {
  /// Go to another screen.
  Navigate(model.Route)
  /// A session was created. `registered` is a brand-new account, whose guest
  /// progress moves into it automatically.
  SignedIn(session: wire.Session, registered: Bool)
  /// A banner for whatever just went wrong (or right).
  Notice(String)
  /// The scheduler settings and the account knobs, as now shown.
  ProfileChanged(wire.Profile)
  /// The editor keymap, a device preference.
  KeymapChanged(String)
  /// The sync bar, on or off, while something reloads.
  Refreshing(Bool)
  /// Fetch the boot state again: the data on screen is out of date.
  Reload
  /// Open or close the `?` cheatsheet.
  ToggleHelp
  /// Enter a track, optionally with twenty easy problems queued in it.
  EnterTrack(track: String, starter: Bool)
  /// Hand a message to the app, for a screen that is not a page yet. Goes
  /// once the last of them has moved.
  Dispatch(msg.Msg)
}
