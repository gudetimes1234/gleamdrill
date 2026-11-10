package main

import "strings"

func stripScheme(url string) string {
	return strings.TrimPrefix(url, "https://")
}
