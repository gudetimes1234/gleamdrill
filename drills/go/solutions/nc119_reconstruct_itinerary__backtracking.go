package main

import "sort"

func findItinerary(tickets [][]string) []string {
	// Try destinations in lexical order and backtrack when a choice
	// strands the rest of the tickets. The first complete route found is
	// the smallest.
	next := map[string][]string{}
	for _, t := range tickets {
		next[t[0]] = append(next[t[0]], t[1])
	}
	used := map[string][]bool{}
	for airport, destinations := range next {
		sort.Strings(destinations)
		used[airport] = make([]bool, len(destinations))
	}
	route := []string{"JFK"}
	var build func() bool
	build = func() bool {
		if len(route) == len(tickets)+1 {
			return true
		}
		airport := route[len(route)-1]
		for i, destination := range next[airport] {
			if used[airport][i] {
				continue
			}
			used[airport][i] = true
			route = append(route, destination)
			if build() {
				return true
			}
			route = route[:len(route)-1]
			used[airport][i] = false
		}
		return false
	}
	build()
	return route
}
