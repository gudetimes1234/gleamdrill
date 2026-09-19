package main

func ladderLength(beginWord string, endWord string, wordList []string) int {
	words := map[string]bool{}
	for _, w := range wordList {
		words[w] = true
	}
	if !words[endWord] {
		return 0
	}
	// Breadth-first over words, generating each neighbour by changing one
	// letter and keeping the ones in the list. Level = ladder length.
	queue := []string{beginWord}
	delete(words, beginWord)
	for length := 1; len(queue) > 0; length++ {
		next := []string{}
		for _, word := range queue {
			if word == endWord {
				return length
			}
			letters := []byte(word)
			for i := range letters {
				original := letters[i]
				for c := byte('a'); c <= 'z'; c++ {
					letters[i] = c
					candidate := string(letters)
					if words[candidate] {
						delete(words, candidate)
						next = append(next, candidate)
					}
				}
				letters[i] = original
			}
		}
		queue = next
	}
	return 0
}
