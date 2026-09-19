package main

import (
	"strconv"
	"strings"
)

// Length-prefix each string: "4#code3#abc". The length tells the decoder
// exactly how far to read, so the strings can contain anything at all.
func encode(strs []string) string {
	var b strings.Builder
	for _, s := range strs {
		b.WriteString(strconv.Itoa(len(s)))
		b.WriteByte('#')
		b.WriteString(s)
	}
	return b.String()
}

func decode(s string) []string {
	result := []string{}
	i := 0
	for i < len(s) {
		hash := strings.IndexByte(s[i:], '#') + i
		length, _ := strconv.Atoi(s[i:hash])
		result = append(result, s[hash+1:hash+1+length])
		i = hash + 1 + length
	}
	return result
}
