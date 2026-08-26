[
  {"find_itinerary(MUC/LHR/SFO/SJC chain)", inspect(["JFK", "MUC", "LHR", "SFO", "SJC"]),
   inspect(
     Solution.find_itinerary([
       ["MUC", "LHR"],
       ["JFK", "MUC"],
       ["SFO", "SJC"],
       ["LHR", "SFO"]
     ])
   )},
  {"find_itinerary(two ways out of JFK -- smallest first)",
   inspect(["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"]),
   inspect(
     Solution.find_itinerary([
       ["JFK", "SFO"],
       ["JFK", "ATL"],
       ["SFO", "ATL"],
       ["ATL", "JFK"],
       ["ATL", "SFO"]
     ])
   )},
  {"find_itinerary(KUL is a dead end, so it must come last)",
   inspect(["JFK", "NRT", "JFK", "KUL"]),
   inspect(
     Solution.find_itinerary([["JFK", "KUL"], ["JFK", "NRT"], ["NRT", "JFK"]])
   )},
  {"find_itinerary([])", inspect(["JFK"]), inspect(Solution.find_itinerary([]))}
]
