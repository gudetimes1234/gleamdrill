package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("wordBreak('leetcode', ['leet','code'])", true, wordBreak("leetcode", []string{"leet", "code"})),
			tc("wordBreak('applepenapple', ['apple','pen'])", true, wordBreak("applepenapple", []string{"apple", "pen"})),
			tc("wordBreak('catsandog', ['cats','dog','sand','and','cat'])", false, wordBreak("catsandog", []string{"cats", "dog", "sand", "and", "cat"})),
			tc("wordBreak('', ['a'])", true, wordBreak("", []string{"a"})),
			tc("wordBreak('a', [])", false, wordBreak("a", []string{})),
			tc("wordBreak('aaaaaaa', ['aaa','aaaa'])", true, wordBreak("aaaaaaa", []string{"aaa", "aaaa"})),
		}
	})
}
