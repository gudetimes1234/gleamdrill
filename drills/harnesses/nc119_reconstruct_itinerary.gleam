import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "find_itinerary(MUC/LHR/SFO/SJC chain)",
      string.inspect(["JFK", "MUC", "LHR", "SFO", "SJC"]),
      string.inspect(
        solution.find_itinerary([
          #("MUC", "LHR"),
          #("JFK", "MUC"),
          #("SFO", "SJC"),
          #("LHR", "SFO"),
        ]),
      ),
    ),
    #(
      "find_itinerary(two ways out of JFK — smallest first)",
      string.inspect(["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"]),
      string.inspect(
        solution.find_itinerary([
          #("JFK", "SFO"),
          #("JFK", "ATL"),
          #("SFO", "ATL"),
          #("ATL", "JFK"),
          #("ATL", "SFO"),
        ]),
      ),
    ),
    #(
      "find_itinerary(KUL is a dead end, so it must come last)",
      string.inspect(["JFK", "NRT", "JFK", "KUL"]),
      string.inspect(
        solution.find_itinerary([
          #("JFK", "KUL"),
          #("JFK", "NRT"),
          #("NRT", "JFK"),
        ]),
      ),
    ),
    #(
      "find_itinerary([])",
      string.inspect(["JFK"]),
      string.inspect(solution.find_itinerary([])),
    ),
  ]
}
