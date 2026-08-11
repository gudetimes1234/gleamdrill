import gleam/int

pub type Config {
  Config(host: String, port: Int, timeout: Int)
}

/// What `use <- result.try` desugars to. Same behaviour, one level of nesting
/// per fallible step — which is exactly the staircase `use` exists to flatten.
pub fn parse_config(
  host: String,
  port: String,
  timeout: String,
) -> Result(Config, Nil) {
  case int.parse(port) {
    Error(Nil) -> Error(Nil)
    Ok(port) ->
      case int.parse(timeout) {
        Error(Nil) -> Error(Nil)
        Ok(timeout) ->
          case host {
            "" -> Error(Nil)
            _ -> Ok(Config(host, port, timeout))
          }
      }
  }
}
