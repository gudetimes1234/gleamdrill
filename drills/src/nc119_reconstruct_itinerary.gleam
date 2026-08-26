import gleam/dict.{type Dict}
import gleam/list
import gleam/result
import gleam/string

pub fn find_itinerary(tickets: List(#(String, String))) -> List(String) {
  let destinations =
    list.fold(tickets, dict.new(), fn(acc, ticket: #(String, String)) {
      dict.insert(acc, ticket.0, [
        ticket.1,
        ..result.unwrap(dict.get(acc, ticket.0), [])
      ])
    })
    |> dict.map_values(fn(_, options) { list.sort(options, string.compare) })

  let #(_, route) = walk(destinations, "JFK", [])
  route
}

// Hierholzer's algorithm. Take the smallest unused ticket every time and never
// look back: an airport is only added to the route once it has no tickets left,
// so the dead end the greedy choice walks into is exactly where the route has
// to *end*, and it lands at the front of the answer by being recorded first.
fn walk(
  destinations: Dict(String, List(String)),
  airport: String,
  route: List(String),
) -> #(Dict(String, List(String)), List(String)) {
  case dict.get(destinations, airport) {
    Ok([next, ..rest]) -> {
      let #(destinations, route) =
        walk(dict.insert(destinations, airport, rest), next, route)
      walk(destinations, airport, route)
    }
    _ -> #(destinations, [airport, ..route])
  }
}
