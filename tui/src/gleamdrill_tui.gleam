//// GleamDrill in the terminal: the web app's catalogue, scheduler and tmux
//// keys, drawn with etui and run by Node, on the desktop or in Termux.
////
//// `gleam run` from this directory, in a real terminal. Guest progress is
//// kept in `$XDG_DATA_HOME/gleamdrill/guest.json`; sign in from settings
//// (`C-b 5`) to study the account the web app uses.

import gleam/javascript/promise.{type Promise}
import gleamdrill_tui/app
import gleamdrill_tui/runtime
import gleamdrill_tui/view

pub fn main() -> Promise(Nil) {
  runtime.run(runtime.Game(
    load: app.load,
    keypressed: app.keypressed,
    pasted: app.pasted,
    received: app.received,
    update: app.update,
    draw: view.draw,
    quit: app.quit,
    animating: app.animating,
  ))
}
