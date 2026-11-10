package main

func lookup(c *Cache, key string) []any {
	v, ok := c.Get(key)
	return []any{v, ok}
}

func twice(c *Cache) []any {
	c.Get("a")
	return lookup(c, "a")
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`Get("a") on {a: 1}`, []any{1, true}, lookup(&Cache{data: map[string]int{"a": 1}}, "a")),
			tc(`Get("b") on {a: 1}`, []any{0, false}, lookup(&Cache{data: map[string]int{"a": 1}}, "b")),
			tc(`Get("a") on an empty Cache`, []any{0, false}, lookup(&Cache{}, "a")),
			tc(`Get twice on one Cache -- the lock is released`, []any{1, true}, twice(&Cache{data: map[string]int{"a": 1}})),
			uses(`defer\s+[\w.]*Unlock\(\)`, "defer to unlock"),
			avoids(`(?m)^\s*[\w.]+\.Unlock\(\)`, "an Unlock call before each return"),
		}
	})
}
