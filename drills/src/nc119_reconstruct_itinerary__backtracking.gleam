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

  // Every ticket used, smallest option first, undoing a choice that leads
  // nowhere. Because the options are sorted, the first complete itinerary found
  // is the smallest one — no comparing of candidates. Exponential in the worst
  // case, which is what Hierholzer's one-pass walk removes.
  case extend(destinations, "JFK", ["JFK"], list.length(tickets)) {
    Ok(route) -> list.reverse(route)
    Error(Nil) -> []
  }
}

fn extend(
  destinations: Dict(String, List(String)),
  airport: String,
  route: List(String),
  remaining: Int,
) -> Result(List(String), Nil) {
  case remaining {
    0 -> Ok(route)
    _ ->
      try_each(
        destinations,
        airport,
        route,
        remaining,
        result.unwrap(dict.get(destinations, airport), []),
        [],
      )
  }
}

fn try_each(
  destinations: Dict(String, List(String)),
  airport: String,
  route: List(String),
  remaining: Int,
  options: List(String),
  rejected: List(String),
) -> Result(List(String), Nil) {
  case options {
    [] -> Error(Nil)
    [next, ..rest] -> {
      let left = list.append(list.reverse(rejected), rest)
      case
        extend(
          dict.insert(destinations, airport, left),
          next,
          [next, ..route],
          remaining - 1,
        )
      {
        Ok(found) -> Ok(found)
        Error(Nil) ->
          try_each(destinations, airport, route, remaining, rest, [
            next,
            ..rejected
          ])
      }
    }
  }
}
