package main

func letterCombinations(digits string) []string {
	if digits == "" {
		return []string{}
	}
	keys := map[byte]string{
		'2': "abc", '3': "def", '4': "ghi", '5': "jkl",
		'6': "mno", '7': "pqrs", '8': "tuv", '9': "wxyz",
	}
	// A cartesian product built one digit at a time: every prefix so far
	// gets every letter of the next key appended.
	result := []string{""}
	for i := 0; i < len(digits); i++ {
		next := []string{}
		for _, prefix := range result {
			for j := 0; j < len(keys[digits[i]]); j++ {
				next = append(next, prefix+string(keys[digits[i]][j]))
			}
		}
		result = next
	}
	return result
}
