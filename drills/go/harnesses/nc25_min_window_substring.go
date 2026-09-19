package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("minWindow('ADOBECODEBANC', 'ABC')", "BANC", minWindow("ADOBECODEBANC", "ABC")),
			tc("minWindow('a', 'a')", "a", minWindow("a", "a")),
			tc("minWindow('a', 'aa')", "", minWindow("a", "aa")),
			tc("minWindow('ab', 'b')", "b", minWindow("ab", "b")),
		}
	})
}
