package main

type Counter struct {
	counts map[string]int
}

func (c *Counter) Init() {
	c.counts = map[string]int{}
}

func (c *Counter) Add(word string) {
	c.counts[word]++
}

func (c *Counter) Count(word string) int {
	return c.counts[word]
}

func countOf(words []string, target string) int {
	var c Counter
	c.Init()
	for _, w := range words {
		c.Add(w)
	}
	return c.Count(target)
}
