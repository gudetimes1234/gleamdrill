package main

import "slices"

func dedupeSorted(ids []int) []int {
	return slices.Compact(ids)
}
