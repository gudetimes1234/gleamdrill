package main

import "strings"

func splitSetting(line string) (string, string, bool) {
	return strings.Cut(line, "=")
}
