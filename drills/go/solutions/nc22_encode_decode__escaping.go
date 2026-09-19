package main

import "strings"

// Escape the delimiter instead of counting: a backslash before every
// backslash and every comma, and a plain comma closing each string -- a
// terminator rather than a separator, so [""] and [] encode differently.
func encode(strs []string) string {
	var b strings.Builder
	for _, s := range strs {
		b.WriteString(strings.NewReplacer(`\`, `\\`, ",", `\,`).Replace(s))
		b.WriteByte(',')
	}
	return b.String()
}

func decode(s string) []string {
	result := []string{}
	var current strings.Builder
	for i := 0; i < len(s); i++ {
		switch s[i] {
		case '\\':
			i++
			current.WriteByte(s[i])
		case ',':
			result = append(result, current.String())
			current.Reset()
		default:
			current.WriteByte(s[i])
		}
	}
	return result
}
