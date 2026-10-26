//// The operating system, as the terminal app sees it: files under the XDG
//// directories, child processes, HTTP and the clock. Node only.

import gleam/javascript/promise.{type Promise}
import gleam/result

@external(javascript, "./sys_ffi.mjs", "nowMs")
pub fn now_ms() -> Int

@external(javascript, "./sys_ffi.mjs", "randomFloat")
pub fn random_float() -> Float

@external(javascript, "./sys_ffi.mjs", "env")
pub fn env(name: String) -> Result(String, Nil)

@external(javascript, "./sys_ffi.mjs", "homeDir")
fn home_dir() -> String

@external(javascript, "./sys_ffi.mjs", "nodeMajor")
pub fn node_major() -> Int

@external(javascript, "./sys_ffi.mjs", "nodePath")
pub fn node_path() -> String

@external(javascript, "./sys_ffi.mjs", "readFile")
pub fn read_file(path: String) -> Result(String, Nil)

/// Atomic: written beside, then renamed over.
@external(javascript, "./sys_ffi.mjs", "writeFile")
pub fn write_file(path: String, text: String) -> Result(Nil, String)

@external(javascript, "./sys_ffi.mjs", "removeFile")
pub fn remove_file(path: String) -> Nil

@external(javascript, "./sys_ffi.mjs", "exists")
pub fn exists(path: String) -> Bool

@external(javascript, "./sys_ffi.mjs", "tempDir")
pub fn temp_dir(prefix: String) -> String

@external(javascript, "./sys_ffi.mjs", "removeDir")
pub fn remove_dir(path: String) -> Nil

@external(javascript, "./sys_ffi.mjs", "which")
pub fn which(program: String) -> Bool

/// Runs `command file` on the real terminal and waits for it to exit.
@external(javascript, "./sys_ffi.mjs", "runInteractive")
pub fn run_interactive(command: String, file: String) -> Result(Int, String)

pub type Exit {
  Exit(code: Int, stdout: String, stderr: String, timed_out: Bool)
}

@external(javascript, "./sys_ffi.mjs", "runCaptured")
fn run_captured_ffi(
  program: String,
  args: List(String),
  cwd: String,
  timeout_ms: Int,
) -> Promise(#(Int, String, String, Bool))

/// Runs a program to completion with its output captured, killed (with its
/// children) after `timeout_ms`.
pub fn run_captured(
  program: String,
  args: List(String),
  cwd: String,
  timeout_ms: Int,
) -> Promise(Exit) {
  use #(code, stdout, stderr, timed_out) <- promise.map(run_captured_ffi(
    program,
    args,
    cwd,
    timeout_ms,
  ))
  Exit(code:, stdout:, stderr:, timed_out:)
}

/// `#(status, body)`; status 0 when nothing answered, with the reason as body.
@external(javascript, "./sys_ffi.mjs", "request")
pub fn request(
  method: String,
  url: String,
  token: String,
  body: String,
) -> Promise(#(Int, String))

// --- where things live ------------------------------------------------------------

fn xdg(variable: String, fallback: String) -> String {
  env(variable) |> result.unwrap(home_dir() <> "/" <> fallback)
}

/// The guest store and anything else that is the user's data.
pub fn data_dir() -> String {
  xdg("XDG_DATA_HOME", ".local/share") <> "/gleamdrill"
}

/// The sign-in token and the preferences.
pub fn config_dir() -> String {
  xdg("XDG_CONFIG_HOME", ".config") <> "/gleamdrill"
}

/// The Gleam run project, rebuilt freely.
pub fn cache_dir() -> String {
  xdg("XDG_CACHE_HOME", ".cache") <> "/gleamdrill"
}
