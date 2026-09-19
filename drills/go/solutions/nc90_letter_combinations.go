package main

func letterCombinations(digits string) []string {
	if digits == "" {
		return []string{}
	}
	keys := map[byte]string{
		'2': "abc", '3': "def", '4': "ghi", '5': "jkl",
		'6': "mno", '7': "pqrs", '8': "tuv", '9': "wxyz",
	}
	result := []string{}
	var build func(i int, current []byte)
	build = func(i int, current []byte) {
		if i == len(digits) {
			result = append(result, string(current))
			return
		}
		for j := 0; j < len(keys[digits[i]]); j++ {
			build(i+1, append(current, keys[digits[i]][j]))
		}
	}
	build(0, []byte{})
	return result
}
