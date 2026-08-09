import gleam/dict
import gleam/option

pub fn port_description(config: dict.Dict(String, String)) -> String {
  let port =
    dict.get(config, "port")
    |> option.from_result
    |> option.map(fn(raw) { raw <> " (configured)" })
    |> option.unwrap("8080 (default)")
  "port: " <> port
}
