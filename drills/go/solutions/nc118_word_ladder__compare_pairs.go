package main

func ladderLength(beginWord string, endWord string, wordList []string) int {
	// Build the adjacency explicitly by comparing every pair of words
	// (O(n^2 * len)), then a plain breadth-first search over it.
	words := append([]string{beginWord}, wordList...)
	target := -1
	for i, w := range words {
		if w == endWord {
			target = i
		}
	}
	if target < 0 {
		return 0
	}
	adjacent := make([][]int, len(words))
	for i := 0; i < len(words); i++ {
		for j := i + 1; j < len(words); j++ {
			if oneLetterApart(words[i], words[j]) {
				adjacent[i] = append(adjacent[i], j)
				adjacent[j] = append(adjacent[j], i)
			}
		}
	}
	seen := make([]bool, len(words))
	seen[0] = true
	queue := []int{0}
	for length := 1; len(queue) > 0; length++ {
		next := []int{}
		for _, i := range queue {
			if words[i] == endWord {
				return length
			}
			for _, j := range adjacent[i] {
				if !seen[j] {
					seen[j] = true
					next = append(next, j)
				}
			}
		}
		queue = next
	}
	return 0
}

func oneLetterApart(a, b string) bool {
	if len(a) != len(b) {
		return false
	}
	differences := 0
	for i := 0; i < len(a); i++ {
		if a[i] != b[i] {
			differences++
		}
	}
	return differences == 1
}
