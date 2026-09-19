package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("longestPalindrome('babad')", "bab", longestPalindrome("babad")),
			tc("longestPalindrome('cbbd')", "bb", longestPalindrome("cbbd")),
			tc("longestPalindrome('a')", "a", longestPalindrome("a")),
			tc("longestPalindrome('forgeeksskeegfor')", "geeksskeeg", longestPalindrome("forgeeksskeegfor")),
			tc("len(longestPalindrome('abcd'))", 1, len(longestPalindrome("abcd"))),
		}
	})
}
