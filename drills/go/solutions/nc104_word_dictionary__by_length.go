package main

// Words bucketed by length: a query only has to be compared against the
// words of its own length, position by position with dots as wildcards.
type WordDictionary struct {
	byLength map[int][]string
}

func Constructor() WordDictionary {
	return WordDictionary{byLength: map[int][]string{}}
}

func (d *WordDictionary) AddWord(word string) {
	d.byLength[len(word)] = append(d.byLength[len(word)], word)
}

func (d *WordDictionary) Search(word string) bool {
	for _, candidate := range d.byLength[len(word)] {
		matches := true
		for i := 0; i < len(word); i++ {
			if word[i] != '.' && word[i] != candidate[i] {
				matches = false
				break
			}
		}
		if matches {
			return true
		}
	}
	return false
}
