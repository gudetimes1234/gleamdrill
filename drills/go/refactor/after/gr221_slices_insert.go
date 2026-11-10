package main

import "slices"

func insertAt(queue []string, i int, name string) []string {
	return slices.Insert(queue, i, name)
}
