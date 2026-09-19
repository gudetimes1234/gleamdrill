package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("isMatch('aa', 'a')", false, isMatch("aa", "a")),
			tc("isMatch('aa', 'a*')", true, isMatch("aa", "a*")),
			tc("isMatch('ab', '.*')", true, isMatch("ab", ".*")),
			tc("isMatch('aab', 'c*a*b')", true, isMatch("aab", "c*a*b")),
			tc("isMatch('mississippi', 'mis*is*p*.')", false, isMatch("mississippi", "mis*is*p*.")),
			tc("isMatch('', '.*')", true, isMatch("", ".*")),
			tc("isMatch('', '')", true, isMatch("", "")),
			tc("isMatch('abc', 'abc')", true, isMatch("abc", "abc")),
		}
	})
}
