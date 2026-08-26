import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.findItinerary !== "function") throw new Error("__signature_mismatch__");
  return [
    ["findItinerary(MUC/LHR/SFO/SJC chain)", show(["JFK", "MUC", "LHR", "SFO", "SJC"]), show(solution.findItinerary([["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]))],
    ["findItinerary(two ways out of JFK -- smallest first)", show(["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"]), show(solution.findItinerary([["JFK", "SFO"], ["JFK", "ATL"], ["SFO", "ATL"], ["ATL", "JFK"], ["ATL", "SFO"]]))],
    ["findItinerary(KUL is a dead end, so it must come last)", show(["JFK", "NRT", "JFK", "KUL"]), show(solution.findItinerary([["JFK", "KUL"], ["JFK", "NRT"], ["NRT", "JFK"]]))],
    ["findItinerary([])", show(["JFK"]), show(solution.findItinerary([]))],
  ];
}
