package main

func letters(rows ...string) [][]byte {
	out := make([][]byte, len(rows))
	for i, row := range rows {
		out[i] = []byte(row)
	}
	return out
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc("findWords(board, ['oath','pea','eat','rain'])", []string{"eat", "oath"}, sortStrings(findWords(letters("oaan", "etae", "ihkr", "iflv"), []string{"oath", "pea", "eat", "rain"}))),
			tc("findWords([['a','b'],['c','d']], ['abcb'])", []string{}, sortStrings(findWords(letters("ab", "cd"), []string{"abcb"}))),
			tc("findWords([['a']], ['a'])", []string{"a"}, sortStrings(findWords(letters("a"), []string{"a"}))),
			tc("findWords(board, [])", []string{}, sortStrings(findWords(letters("oaan", "etae"), []string{}))),
			tc("findWords(board, ['oa', 'oa']) -- once each", []string{"oa"}, sortStrings(findWords(letters("oaan", "etae", "ihkr", "iflv"), []string{"oa", "oa"}))),
		}
	})
}
