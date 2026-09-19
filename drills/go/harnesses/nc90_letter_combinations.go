package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("letterCombinations('23')", []string{"ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"}, sortStrings(letterCombinations("23"))),
			tc("letterCombinations('')", []string{}, letterCombinations("")),
			tc("letterCombinations('2')", []string{"a", "b", "c"}, sortStrings(letterCombinations("2"))),
			tc("len(letterCombinations('79'))", 16, len(letterCombinations("79"))),
		}
	})
}
