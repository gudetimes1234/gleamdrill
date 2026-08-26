try:
    (findItinerary)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("findItinerary(MUC/LHR/SFO/SJC chain)", ["JFK", "MUC", "LHR", "SFO", "SJC"], findItinerary([["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]))
__case__("findItinerary(two ways out of JFK -- smallest first)", ["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"], findItinerary([["JFK", "SFO"], ["JFK", "ATL"], ["SFO", "ATL"], ["ATL", "JFK"], ["ATL", "SFO"]]))
__case__("findItinerary(KUL is a dead end, so it must come last)", ["JFK", "NRT", "JFK", "KUL"], findItinerary([["JFK", "KUL"], ["JFK", "NRT"], ["NRT", "JFK"]]))
__case__("findItinerary([])", ["JFK"], findItinerary([]))
