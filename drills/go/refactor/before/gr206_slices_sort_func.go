package main

import "sort"

type Player struct {
	Name  string
	Score int
}

func rank(players []Player) {
	sort.Slice(players, func(i, j int) bool {
		if players[i].Score != players[j].Score {
			return players[i].Score > players[j].Score
		}
		return players[i].Name < players[j].Name
	})
}
