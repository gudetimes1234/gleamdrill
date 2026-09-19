package main

// Letters no rule orders may come in any order, so a result is checked
// against the rules rather than against one string.
func consistent(words []string, expectedLetters int) bool {
	order := alienOrder(words)
	if len(order) != expectedLetters {
		return false
	}
	position := map[byte]int{}
	for i := 0; i < len(order); i++ {
		position[order[i]] = i
	}
	for i := 0; i+1 < len(words); i++ {
		a, b := words[i], words[i+1]
		for j := 0; j < len(a) && j < len(b); j++ {
			if a[j] != b[j] {
				if position[a[j]] > position[b[j]] {
					return false
				}
				break
			}
		}
	}
	return true
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc("alienOrder(['wrt','wrf','er','ett','rftt'])", "wertf", alienOrder([]string{"wrt", "wrf", "er", "ett", "rftt"})),
			tc("alienOrder(['z','x'])", "zx", alienOrder([]string{"z", "x"})),
			tc("alienOrder(['z','x','z']) -- contradictory", "", alienOrder([]string{"z", "x", "z"})),
			tc("alienOrder(['abc','ab']) -- a word before its own prefix", "", alienOrder([]string{"abc", "ab"})),
			tc("alienOrder(['z','z'])", "z", alienOrder([]string{"z", "z"})),
			tc("alienOrder(['ac','ab','zc','zb']) respects every rule", true, consistent([]string{"ac", "ab", "zc", "zb"}, 4)),
		}
	})
}
