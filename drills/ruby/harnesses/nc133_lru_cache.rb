need :LRUCache

c = LRUCache.new(2)
c.put(1, 1)
c.put(2, 2)
tc "get(1) after put(1, 1), put(2, 2)", 1, c.get(1)
c.put(3, 3)
tc "get(2) after put(3, 3) -- 2 was least recently used", -1, c.get(2)
tc "get(3) after put(3, 3)", 3, c.get(3)
c.put(4, 4)
tc "get(1) after put(4, 4) -- reading 3 saved it, so 1 went", -1, c.get(1)
tc "get(3) after put(4, 4)", 3, c.get(3)
tc "get(4) after put(4, 4)", 4, c.get(4)
tc "get(99) on a key never stored", -1, c.get(99)

u = LRUCache.new(1)
u.put(5, 5)
u.put(5, 9)
tc "get(5) after put(5, 5) then put(5, 9) -- an update, not an insert", 9, u.get(5)
