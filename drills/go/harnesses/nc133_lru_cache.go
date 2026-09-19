package main

func main() {
	run(func() []testCase {
		cache := Constructor(2)
		cache.Put(1, 1)
		cache.Put(2, 2)
		first := cache.Get(1)
		cache.Put(3, 3)
		evicted := cache.Get(2)
		kept := cache.Get(3)
		cache.Put(4, 4)
		return []testCase{
			tc("get(1) after put(1,1), put(2,2)", 1, first),
			tc("get(2) after put(3,3) -- 2 was least recently used", -1, evicted),
			tc("get(3) after put(3,3)", 3, kept),
			tc("get(1) after put(4,4) -- reading 3 saved it, so 1 went", -1, cache.Get(1)),
			tc("get(3) after put(4,4)", 3, cache.Get(3)),
			tc("get(4) after put(4,4)", 4, cache.Get(4)),
		}
	})
}
