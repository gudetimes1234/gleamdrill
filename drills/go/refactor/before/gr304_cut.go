package main

import "strings"

func splitSetting(line string) (string, string, bool) {
	i := strings.Index(line, "=")
	if i == -1 {
		return line, "", false
	}
	return line[:i], line[i+1:], true
}
