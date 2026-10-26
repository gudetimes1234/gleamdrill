//// A small game loop over etui's terminal, shaped after LÖVE: `load` once,
//// `keypressed` for each key, `update` every frame with the time since the
//// last, `draw` to paint. Gleam can't draw as a side effect the way
//// `love.graphics` does, so `draw` returns the frame instead.
////
//// What it adds over etui's own `app.run_*` is effects: a callback can hand
//// back work (a fetch, a child process, an editor) whose result comes in
//// later through `received`, the way a Bubble Tea `Cmd` does.

import etui/backend
import etui/backend/default
import etui/buffer.{type Buffer}
import etui/geometry.{type Position, type Rect}
import etui/terminal.{type Terminal}
import gleam/javascript/promise.{type Promise}
import gleam/list
import gleam/option.{type Option, None, Some}
import gleamdrill_tui/sys

/// Work to do outside the loop. It is handed `send` and calls it, now or
/// whenever its result is in, with the message `received` will be given.
pub type Effect(msg) =
  fn(fn(msg) -> Nil) -> Nil

pub type Game(model, msg) {
  Game(
    load: fn() -> #(model, List(Effect(msg))),
    /// `key` is etui's spelling: `"j"`, `"enter"`, `"ctrl+b"`, `"up"`.
    keypressed: fn(model, String) -> #(model, List(Effect(msg))),
    /// Pasted text, whole, where the terminal brackets a paste.
    pasted: fn(model, String) -> #(model, List(Effect(msg))),
    received: fn(model, msg) -> #(model, List(Effect(msg))),
    /// Every frame, with the milliseconds since the last one, and whether
    /// what it changed needs a frame drawn (a card coming back on time).
    update: fn(model, Int) -> #(model, Bool),
    /// The frame, and where the cursor goes, if anywhere.
    draw: fn(model, Rect) -> #(Buffer, Option(Position)),
    quit: fn(model) -> Bool,
    /// Whether something on screen moves (a spinner), so frames are drawn
    /// with nothing pressed. Otherwise a frame is drawn only for a key, a
    /// result or a resize.
    animating: fn(model) -> Bool,
    /// How often to draw anyway, with nothing pressed and nothing moving, so
    /// a screen that shows the time (a countdown, what's due) keeps up.
    refresh: fn(model) -> Option(Int),
  )
}

/// How long one poll waits for a key, so effects land and spinners turn
/// even when nothing is pressed.
const frame_ms = 30

/// How long a poll waits when nothing moves. An effect's result waits at
/// most this long to be shown.
const idle_ms = 100

@external(javascript, "./sys_ffi.mjs", "post")
fn post(message: msg) -> Nil

@external(javascript, "./sys_ffi.mjs", "drain")
fn drain() -> List(msg)

@external(javascript, "./sys_ffi.mjs", "requestSuspend")
fn request_suspend(job: fn() -> Nil) -> Nil

@external(javascript, "./sys_ffi.mjs", "takeSuspend")
fn take_suspend() -> Result(fn() -> Nil, Nil)

/// An effect that gives the terminal back to the shell while `job` runs (an
/// editor, say), then takes it back and repaints, and sends what it returned.
pub fn suspend(job: fn() -> a, to: fn(a) -> msg) -> Effect(msg) {
  fn(send) { request_suspend(fn() { send(to(job())) }) }
}

/// An effect that sends whatever a promise resolves to.
pub fn from_promise(work: fn() -> Promise(a), to: fn(a) -> msg) -> Effect(msg) {
  fn(send) {
    promise.map(work(), fn(value) { send(to(value)) })
    Nil
  }
}

pub fn run(game: Game(model, msg)) -> Promise(Nil) {
  let backend =
    default.new_with_options(
      backend.Options(..backend.default_options(), paste: True),
    )
  case terminal.new(backend) {
    Error(_) -> promise.resolve(Nil)
    Ok(term) -> {
      let #(model, effects) = game.load()
      perform(effects)
      let start = sys.now_ms()
      use _ <- promise.map(step(game, backend, term, model, start, start, True))
      Nil
    }
  }
}

fn perform(effects: List(Effect(msg))) -> Nil {
  list.each(effects, fn(effect) { effect(post) })
}

fn step(
  game: Game(model, msg),
  backend: backend.AsyncBackend(state),
  term: Terminal(state),
  model: model,
  last: Int,
  drawn: Int,
  dirty: Bool,
) -> Promise(Nil) {
  // Results first, so a frame shows the newest state.
  let messages = drain()
  let model =
    list.fold(messages, model, fn(model, message) {
      let #(model, effects) = game.received(model, message)
      perform(effects)
      model
    })
  let #(term, resumed) = case take_suspend() {
    Ok(job) -> {
      terminal.restore(term)
      job()
      case terminal.new(backend) {
        Ok(fresh) -> #(fresh, True)
        Error(_) -> #(term, True)
      }
    }
    Error(Nil) -> #(term, False)
  }
  let now = sys.now_ms()
  let #(model, changed) = game.update(model, now - last)
  let animating = game.animating(model)
  case game.quit(model) {
    True -> {
      terminal.restore(term)
      promise.resolve(Nil)
    }
    False -> {
      // Nothing new and nothing moving: no frame. An idle app costs a poll.
      let due = case game.refresh(model) {
        Some(every) -> now - drawn >= every
        None -> False
      }
      let draw =
        dirty || resumed || animating || due || changed || messages != []
      let drawn = case draw {
        True -> now
        False -> drawn
      }
      let term = case draw {
        False -> term
        True ->
          case
            terminal.draw(term, fn(frame) {
              let #(buffer, cursor) = game.draw(model, frame.area)
              let frame = terminal.with_buffer(frame, buffer)
              case cursor {
                Some(at) -> terminal.set_cursor(frame, at)
                None -> terminal.hide_cursor(frame)
              }
            })
          {
            Ok(term) -> term
            Error(_) -> term
          }
      }
      let wait = case animating {
        True -> frame_ms
        False -> idle_ms
      }
      use polled <- promise.await(keys(game, term, model, wait, False))
      case polled {
        Ok(#(model, term, dirty)) ->
          step(game, backend, term, model, now, drawn, dirty)
        Error(term) -> {
          terminal.restore(term)
          promise.resolve(Nil)
        }
      }
    }
  }
}

/// Every key already typed, before the next frame is drawn: waits `wait`
/// for the first, then takes the rest without waiting. A burst (a paste, a
/// fast typist, `tmux send-keys`) is one frame rather than one per key.
/// `dirty` is whether anything came in that needs a frame.
///
/// One poll at a time, always awaited: etui loses the keys of a poll that
/// is raced and dropped.
fn keys(
  game: Game(model, msg),
  term: Terminal(state),
  model: model,
  wait: Int,
  dirty: Bool,
) -> Promise(Result(#(model, Terminal(state), Bool), Terminal(state))) {
  use polled <- promise.await(terminal.poll(term, wait))
  case polled {
    Ok(#(backend.KeyPress(key), term)) -> {
      let #(model, effects) = game.keypressed(model, key)
      perform(effects)
      case game.quit(model) {
        True -> promise.resolve(Ok(#(model, term, True)))
        False -> keys(game, term, model, 0, True)
      }
    }
    Ok(#(backend.Paste(text), term)) -> {
      let #(model, effects) = game.pasted(model, text)
      perform(effects)
      keys(game, term, model, 0, True)
    }
    Ok(#(backend.Tick, term)) -> promise.resolve(Ok(#(model, term, dirty)))
    // A resize: etui repaints the whole frame on the next draw.
    Ok(#(_, term)) -> keys(game, term, model, 0, True)
    Error(_) -> promise.resolve(Error(term))
  }
}
