package main

import "strings"

func hasTag(tags []string, want string) bool {
	for _, t := range tags {
		if strings.ToLower(t) == strings.ToLower(want) {
			return true
		}
	}
	return false
}
