package main

type stamped struct {
	value, lastUsed int
}

// Stamp each entry with the tick of its last use; eviction scans for the
// oldest stamp. O(capacity) per eviction, no linked list.
type LRUCache struct {
	capacity int
	clock    int
	entries  map[int]*stamped
}

func Constructor(capacity int) LRUCache {
	return LRUCache{capacity: capacity, entries: map[int]*stamped{}}
}

func (c *LRUCache) Get(key int) int {
	e, ok := c.entries[key]
	if !ok {
		return -1
	}
	c.clock++
	e.lastUsed = c.clock
	return e.value
}

func (c *LRUCache) Put(key int, value int) {
	c.clock++
	if e, ok := c.entries[key]; ok {
		e.value, e.lastUsed = value, c.clock
		return
	}
	if len(c.entries) == c.capacity {
		oldestKey, oldestTick := 0, c.clock+1
		for k, e := range c.entries {
			if e.lastUsed < oldestTick {
				oldestKey, oldestTick = k, e.lastUsed
			}
		}
		delete(c.entries, oldestKey)
	}
	c.entries[key] = &stamped{value, c.clock}
}
