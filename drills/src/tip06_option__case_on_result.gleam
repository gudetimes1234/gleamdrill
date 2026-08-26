import gleam/dict

pub fn port_description(config: dict.Dict(String, String)) -> String {
  let port = case dict.get(config, "port") {
    Ok(raw) -> raw <> " (configured)"
    Error(Nil) -> "8080 (default)"
  }
  "port: " <> port
}
