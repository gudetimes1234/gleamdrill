package main

import (
	"cmp"
	"slices"
)

type Player struct {
	Name  string
	Score int
}

func rank(players []Player) {
	slices.SortFunc(players, func(a, b Player) int {
		if c := cmp.Compare(b.Score, a.Score); c != 0 {
			return c
		}
		return cmp.Compare(a.Name, b.Name)
	})
}
