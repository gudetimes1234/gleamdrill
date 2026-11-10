package main

func main() {
	run(func() []testCase {
		cache := map[int]int{3: 9}
		return []testCase{
			tc(`cachedSquare(cache, 3) -- already cached`, 9, cachedSquare(cache, 3)),
			tc(`cachedSquare(cache, 4)`, 16, cachedSquare(cache, 4)),
			tc(`cache after both calls`, map[int]int{3: 9, 4: 16}, cache),
			tc(`cachedSquare({5: 99}, 5) -- trusts the cache`, 99, cachedSquare(map[int]int{5: 99}, 5)),
			tc(`cachedSquare({}, 0)`, 0, cachedSquare(map[int]int{}, 0)),
			uses(`\bif\s+\w+\s*,\s*\w+\s*:=[^;\n]+;`, "the if v, ok := ...; ok form"),
			avoids(`(?m)^\s*\w+\s*,\s*\w+\s*:=\s*\w+\[`, "a comma-ok on its own line"),
		}
	})
}
