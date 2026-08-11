import gleam/dict

/// Skipping Option entirely: `dict.get` already returns a Result, so one `case`
/// covers both branches. Converting to Option earns its keep when the value is
/// passed on, not when it is consumed immediately like this.
pub fn port_description(config: dict.Dict(String, String)) -> String {
  let port = case dict.get(config, "port") {
    Ok(raw) -> raw <> " (configured)"
    Error(Nil) -> "8080 (default)"
  }
  "port: " <> port
}
