need :TimeMap

store = TimeMap.new
store.set("foo", "bar", 1)

tc 'get("foo", 1) after set at 1', "bar", store.get("foo", 1)
tc 'get("foo", 3) with only the value at 1', "bar", store.get("foo", 3)

store.set("foo", "bar2", 4)

tc 'get("foo", 4) after set at 4', "bar2", store.get("foo", 4)
tc 'get("foo", 5) after set at 4', "bar2", store.get("foo", 5)
tc 'get("foo", 3) still sees the older value', "bar", store.get("foo", 3)
tc 'get("foo", 0) before anything was set', "", store.get("foo", 0)
tc 'get("missing", 1)', "", store.get("missing", 1)
