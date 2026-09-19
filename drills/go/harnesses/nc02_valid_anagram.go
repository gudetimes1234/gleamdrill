package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("isAnagram('anagram', 'nagaram')", true, isAnagram("anagram", "nagaram")),
			tc("isAnagram('rat', 'car')", false, isAnagram("rat", "car")),
			tc("isAnagram('', '')", true, isAnagram("", "")),
			tc("isAnagram('a', 'ab')", false, isAnagram("a", "ab")),
		}
	})
}
