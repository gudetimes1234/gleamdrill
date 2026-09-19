package main

import "strings"

func joined(s string) []string {
	out := []string{}
	for _, pieces := range partition(s) {
		out = append(out, strings.Join(pieces, ","))
	}
	return sortStrings(out)
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc("partition('aab')", []string{"a,a,b", "aa,b"}, joined("aab")),
			tc("partition('a')", []string{"a"}, joined("a")),
			tc("partition('')", []string{""}, joined("")),
			tc("partition('aba')", []string{"a,b,a", "aba"}, joined("aba")),
			tc("partition('abc')", []string{"a,b,c"}, joined("abc")),
		}
	})
}
