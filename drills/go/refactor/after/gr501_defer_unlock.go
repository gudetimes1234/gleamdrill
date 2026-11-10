package main

import "sync"

type Cache struct {
	mu   sync.Mutex
	data map[string]int
}

func (c *Cache) Get(key string) (int, bool) {
	c.mu.Lock()
	defer c.mu.Unlock()
	if c.data == nil {
		return 0, false
	}
	v, ok := c.data[key]
	if !ok {
		return 0, false
	}
	return v, true
}
