package main

type entry struct {
	key, value int
	prev, next *entry
}

// A map for O(1) lookup and a doubly linked list for O(1) recency: the
// head sentinel's next is the most recent, the tail sentinel's prev the
// least. Every access unlinks the entry and relinks it at the front.
type LRUCache struct {
	capacity   int
	entries    map[int]*entry
	head, tail *entry
}

func Constructor(capacity int) LRUCache {
	head, tail := &entry{}, &entry{}
	head.next, tail.prev = tail, head
	return LRUCache{capacity: capacity, entries: map[int]*entry{}, head: head, tail: tail}
}

func (c *LRUCache) Get(key int) int {
	e, ok := c.entries[key]
	if !ok {
		return -1
	}
	c.unlink(e)
	c.pushFront(e)
	return e.value
}

func (c *LRUCache) Put(key int, value int) {
	if e, ok := c.entries[key]; ok {
		e.value = value
		c.unlink(e)
		c.pushFront(e)
		return
	}
	if len(c.entries) == c.capacity {
		oldest := c.tail.prev
		c.unlink(oldest)
		delete(c.entries, oldest.key)
	}
	e := &entry{key: key, value: value}
	c.entries[key] = e
	c.pushFront(e)
}

func (c *LRUCache) unlink(e *entry) {
	e.prev.next, e.next.prev = e.next, e.prev
}

func (c *LRUCache) pushFront(e *entry) {
	e.next, e.prev = c.head.next, c.head
	c.head.next.prev, c.head.next = e, e
}
