package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("characterReplacement('ABAB', 2)", 4, characterReplacement("ABAB", 2)),
			tc("characterReplacement('AABABBA', 1)", 4, characterReplacement("AABABBA", 1)),
			tc("characterReplacement('AAAA', 0)", 4, characterReplacement("AAAA", 0)),
			tc("characterReplacement('ABCDE', 1)", 2, characterReplacement("ABCDE", 1)),
		}
	})
}
