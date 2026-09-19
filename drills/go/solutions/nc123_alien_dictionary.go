package main

func alienOrder(words []string) string {
	// Adjacent words give one ordering each: the first differing letter.
	// Then a topological sort (Kahn) over the letters; a leftover means a cycle.
	next := map[byte]map[byte]bool{}
	indegree := map[byte]int{}
	for _, w := range words {
		for i := 0; i < len(w); i++ {
			if next[w[i]] == nil {
				next[w[i]] = map[byte]bool{}
				indegree[w[i]] = 0
			}
		}
	}
	for i := 0; i+1 < len(words); i++ {
		a, b := words[i], words[i+1]
		if len(a) > len(b) && a[:len(b)] == b {
			return ""
		}
		for j := 0; j < len(a) && j < len(b); j++ {
			if a[j] != b[j] {
				if !next[a[j]][b[j]] {
					next[a[j]][b[j]] = true
					indegree[b[j]]++
				}
				break
			}
		}
	}
	queue := []byte{}
	for c := byte('a'); c <= 'z'; c++ {
		if n, present := indegree[c]; present && n == 0 {
			queue = append(queue, c)
		}
	}
	order := []byte{}
	for len(queue) > 0 {
		c := queue[0]
		queue = queue[1:]
		order = append(order, c)
		for d := byte('a'); d <= 'z'; d++ {
			if next[c][d] {
				indegree[d]--
				if indegree[d] == 0 {
					queue = append(queue, d)
				}
			}
		}
	}
	if len(order) != len(indegree) {
		return ""
	}
	return string(order)
}
