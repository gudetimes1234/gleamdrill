//// What every page reads: the session, the active track and its data, the
//// device preferences and the chrome. Pages get it read-only and ask for
//// changes by returning `Change`s, which the app applies (Elm's "OutMsg").
////
//// While pages move out of the flat model one by one, `Shared` is that
//// model: each migrated page takes its own fields with it, and what is left
//// at the end is exactly the shared state, renamed into a record of its own.

import gleamdrill/model

pub type Shared =
  model.Model
