package main

import "strings"

func mapStrings(items []string, fn func(string) string) []string {
	out := make([]string, 0, len(items))
	for _, item := range items {
		out = append(out, fn(item))
	}
	return out
}

func cleanAll(lines []string) []string {
	r := strings.NewReplacer("\t", " ", "\r", "")
	return mapStrings(lines, func(s string) string {
		return r.Replace(s)
	})
}
