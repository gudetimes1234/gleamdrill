import gleam/result
import gleam/string
import solution

/// Compared field-by-field rather than by inspecting the record, so the check does
/// not depend on how the constructor renders. The annotation is required: Gleam
/// cannot infer a record type from field access alone.
fn fields(
  parsed: Result(solution.Config, Nil),
) -> Result(#(String, Int, Int), Nil) {
  result.map(parsed, fn(config) {
    #(config.host, config.port, config.timeout)
  })
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "parse_config(\"localhost\", \"8080\", \"30\")",
      string.inspect(Ok(#("localhost", 8080, 30))),
      string.inspect(fields(solution.parse_config("localhost", "8080", "30"))),
    ),
    #(
      "parse_config(\"localhost\", \"oops\", \"30\")",
      string.inspect(Error(Nil)),
      string.inspect(fields(solution.parse_config("localhost", "oops", "30"))),
    ),
    #(
      "parse_config(\"\", \"8080\", \"30\")",
      string.inspect(Error(Nil)),
      string.inspect(fields(solution.parse_config("", "8080", "30"))),
    ),
  ]
}
