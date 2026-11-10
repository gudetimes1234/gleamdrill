package main

import "slices"

func position(names []string, target string) int {
	return slices.Index(names, target)
}
