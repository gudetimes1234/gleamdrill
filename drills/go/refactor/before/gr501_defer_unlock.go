package main

import "sync"

type Cache struct {
	mu   sync.Mutex
	data map[string]int
}

func (c *Cache) Get(key string) (int, bool) {
	c.mu.Lock()
	if c.data == nil {
		c.mu.Unlock()
		return 0, false
	}
	v, ok := c.data[key]
	if !ok {
		c.mu.Unlock()
		return 0, false
	}
	c.mu.Unlock()
	return v, true
}
