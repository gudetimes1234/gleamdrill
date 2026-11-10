package main

func main() {
	run(func() []testCase {
		users := []User{{1, "ann"}, {2, "bob"}}
		return []testCase{
			tc(`totalsByName(users, [{1 10} {2 5} {1 7}])`, map[string]int{"ann": 17, "bob": 5}, totalsByName(users, []Order{{1, 10}, {2, 5}, {1, 7}})),
			tc(`totalsByName(users, [{3 99} {2 4}]) -- unknown user skipped`, map[string]int{"bob": 4}, totalsByName(users, []Order{{3, 99}, {2, 4}})),
			tc(`totalsByName(users, nil)`, map[string]int{}, totalsByName(users, nil)),
			tc(`totalsByName(nil, [{1 10}]) -- no users`, map[string]int{}, totalsByName(nil, []Order{{1, 10}})),
			uses(`map\[int\]\w+`, "a map keyed by user ID"),
			avoids(`\bfor\b[^{}]*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\bfor\b`, "a loop inside a loop"),
		}
	})
}
