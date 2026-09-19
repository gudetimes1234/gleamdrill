package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("countSubstrings('abc')", 3, countSubstrings("abc")),
			tc("countSubstrings('aaa')", 6, countSubstrings("aaa")),
			tc("countSubstrings('')", 0, countSubstrings("")),
			tc("countSubstrings('abba')", 6, countSubstrings("abba")),
		}
	})
}
