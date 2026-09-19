package main

// Two sets instead of a tree: every word, and every prefix of every word.
// Insertion is O(len^2) in the prefixes stored, lookups are O(1) hashes.
type Trie struct {
	words    map[string]bool
	prefixes map[string]bool
}

func Constructor() Trie {
	return Trie{words: map[string]bool{}, prefixes: map[string]bool{}}
}

func (t *Trie) Insert(word string) {
	t.words[word] = true
	for i := 0; i <= len(word); i++ {
		t.prefixes[word[:i]] = true
	}
}

func (t *Trie) Search(word string) bool {
	return t.words[word]
}

func (t *Trie) StartsWith(prefix string) bool {
	return t.prefixes[prefix]
}
