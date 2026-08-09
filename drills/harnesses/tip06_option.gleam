import gleam/dict
import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "port_description(dict with port 9000",
      string.inspect("port: 9000 (configured)"),
      string.inspect(
        solution.port_description(dict.from_list([#("port", "9000")])),
      ),
    ),
    #(
      "port_description(empty dict)",
      string.inspect("port: 8080 (default)"),
      string.inspect(solution.port_description(dict.new())),
    ),
  ]
}
