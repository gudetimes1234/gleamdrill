need :find_itinerary

tc "find_itinerary(MUC/LHR/SFO/SJC chain)", ["JFK", "MUC", "LHR", "SFO", "SJC"],
   find_itinerary([["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]])
tc "find_itinerary(two ways out of JFK -- smallest first)", ["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"],
   find_itinerary([["JFK", "SFO"], ["JFK", "ATL"], ["SFO", "ATL"], ["ATL", "JFK"], ["ATL", "SFO"]])
tc "find_itinerary(KUL is a dead end, so it must come last)", ["JFK", "NRT", "JFK", "KUL"],
   find_itinerary([["JFK", "KUL"], ["JFK", "NRT"], ["NRT", "JFK"]])
tc "find_itinerary([])", ["JFK"], find_itinerary([])
