package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("isInterleave('aabcc', 'dbbca', 'aadbbcbcac')", true, isInterleave("aabcc", "dbbca", "aadbbcbcac")),
			tc("isInterleave('aabcc', 'dbbca', 'aadbbbaccc')", false, isInterleave("aabcc", "dbbca", "aadbbbaccc")),
			tc("isInterleave('', '', '')", true, isInterleave("", "", "")),
			tc("isInterleave('a', '', 'a')", true, isInterleave("a", "", "a")),
			tc("isInterleave('', 'b', 'b')", true, isInterleave("", "b", "b")),
			tc("isInterleave('abc', 'def', 'adbecf')", true, isInterleave("abc", "def", "adbecf")),
		}
	})
}
