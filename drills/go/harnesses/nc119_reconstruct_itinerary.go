package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("findItinerary(MUC/LHR/SFO/SJC chain)", []string{"JFK", "MUC", "LHR", "SFO", "SJC"}, findItinerary([][]string{{"MUC", "LHR"}, {"JFK", "MUC"}, {"SFO", "SJC"}, {"LHR", "SFO"}})),
			tc("findItinerary(two ways out of JFK -- smallest first)", []string{"JFK", "ATL", "JFK", "SFO", "ATL", "SFO"}, findItinerary([][]string{{"JFK", "SFO"}, {"JFK", "ATL"}, {"SFO", "ATL"}, {"ATL", "JFK"}, {"ATL", "SFO"}})),
			tc("findItinerary(KUL is a dead end, so it must come last)", []string{"JFK", "NRT", "JFK", "KUL"}, findItinerary([][]string{{"JFK", "KUL"}, {"JFK", "NRT"}, {"NRT", "JFK"}})),
			tc("findItinerary([])", []string{"JFK"}, findItinerary([][]string{})),
		}
	})
}
