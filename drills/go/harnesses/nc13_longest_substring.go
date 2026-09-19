package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("lengthOfLongestSubstring('abcabcbb')", 3, lengthOfLongestSubstring("abcabcbb")),
			tc("lengthOfLongestSubstring('bbbbb')", 1, lengthOfLongestSubstring("bbbbb")),
			tc("lengthOfLongestSubstring('pwwkew')", 3, lengthOfLongestSubstring("pwwkew")),
			tc("lengthOfLongestSubstring('')", 0, lengthOfLongestSubstring("")),
			tc("lengthOfLongestSubstring('abba')", 2, lengthOfLongestSubstring("abba")),
		}
	})
}
