//// Reading the old localStorage blob, once, so a returning user does not lose
//// their work when study data moves to the server.
////
//// This is the only reason the pre-account storage format still has a reader.
//// It is deliberately narrow: of everything the old app persisted, only two
//// things are worth carrying over — the code you typed, and which problems you
//// had solved. Selection state, search text and the current drill position are
//// all reconstructible and are dropped.
////
//// Only `.v4` and `.v3` are read. `.v2` and the original key predate drafts
//// and attempts entirely, so there is nothing in them to import.

import algodrill/problem.{type ProblemRef}
import gleam/dynamic/decode.{type Decoder}
import gleam/json
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import lustre/effect.{type Effect}
import plinth/javascript/storage
import wire.{ProblemRef}

const key_v4 = "algoDrillState.v4"

const key_v3 = "algoDrillState.v3"

/// Set once an import has been offered, so it is never proposed twice.
const imported_key = "algoDrill.imported"

pub type Legacy {
  Legacy(
    drafts: List(#(ProblemRef, String)),
    /// Problems the old app recorded as solved. There are no dates: the old
    /// format stored a single sticky boolean per problem and no timestamps at
    /// all, which is precisely why it could not do spaced repetition.
    solved: List(ProblemRef),
    editor_keymap: String,
  )
}

pub fn is_empty(legacy: Legacy) -> Bool {
  legacy.drafts == [] && legacy.solved == []
}

/// Returns the old state if there is any and it has not been imported yet.
pub fn pending() -> Option(Legacy) {
  case storage.local() {
    Error(Nil) -> None
    Ok(local) ->
      case storage.get_item(local, imported_key) {
        Ok(_) -> None
        Error(Nil) ->
          case read(local, key_v4) {
            Some(legacy) -> Some(legacy)
            None -> read(local, key_v3)
          }
      }
  }
}

pub fn mark_imported() -> Effect(message) {
  use _dispatch <- effect.from
  case storage.local() {
    Ok(local) -> {
      let _ = storage.set_item(local, imported_key, "1")
      Nil
    }
    Error(Nil) -> Nil
  }
}

fn read(local: storage.Storage, key: String) -> Option(Legacy) {
  storage.get_item(local, key)
  |> result.try(fn(raw) {
    json.parse(raw, decoder()) |> result.replace_error(Nil)
  })
  |> option.from_result
}

fn decoder() -> Decoder(Legacy) {
  use drafts <- decode.optional_field(
    "drafts",
    [],
    decode.list(draft_decoder()),
  )
  use attempts <- decode.optional_field(
    "attempts",
    [],
    decode.list(attempt_decoder()),
  )
  use editor_keymap <- decode.optional_field(
    "editorKeymap",
    "default",
    decode.string,
  )
  decode.success(Legacy(
    drafts: drafts,
    solved: attempts
      |> list.filter(fn(pair) { pair.1 })
      |> list.map(fn(pair) { pair.0 }),
    editor_keymap:,
  ))
}

fn ref_decoder() -> Decoder(ProblemRef) {
  use category <- decode.field("category", decode.string)
  use subcategory <- decode.field("subcategory", decode.string)
  use title <- decode.field("title", decode.string)
  decode.success(ProblemRef(category:, subcategory:, title:))
}

fn draft_decoder() -> Decoder(#(ProblemRef, String)) {
  use problem <- decode.then(ref_decoder())
  use draft <- decode.field("draft", decode.string)
  decode.success(#(problem, draft))
}

fn attempt_decoder() -> Decoder(#(ProblemRef, Bool)) {
  use problem <- decode.then(ref_decoder())
  use result <- decode.field("result", decode.string)
  decode.success(#(problem, result == "passed"))
}
