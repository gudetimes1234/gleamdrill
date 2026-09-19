package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("checkInclusion('ab', 'eidbaooo')", true, checkInclusion("ab", "eidbaooo")),
			tc("checkInclusion('ab', 'eidboaoo')", false, checkInclusion("ab", "eidboaoo")),
			tc("checkInclusion('abc', 'ab')", false, checkInclusion("abc", "ab")),
			tc("checkInclusion('a', 'a')", true, checkInclusion("a", "a")),
		}
	})
}
