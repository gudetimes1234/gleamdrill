package main

import "sort"

func findItinerary(tickets [][]string) []string {
	// Hierholzer's algorithm for an Eulerian path: from each airport take
	// the smallest unused destination first; an airport is appended once
	// it has no tickets left, and the reversed order is the itinerary.
	next := map[string][]string{}
	for _, t := range tickets {
		next[t[0]] = append(next[t[0]], t[1])
	}
	for _, destinations := range next {
		sort.Strings(destinations)
	}
	route := []string{}
	var visit func(airport string)
	visit = func(airport string) {
		for len(next[airport]) > 0 {
			destination := next[airport][0]
			next[airport] = next[airport][1:]
			visit(destination)
		}
		route = append(route, airport)
	}
	visit("JFK")
	for i, j := 0, len(route)-1; i < j; i, j = i+1, j-1 {
		route[i], route[j] = route[j], route[i]
	}
	return route
}
