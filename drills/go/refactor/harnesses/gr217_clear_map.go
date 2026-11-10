package main

func main() {
	run(func() []testCase {
		t1 := map[string]int{"a": 1, "b": 2}
		resetTally(t1)
		t2 := map[string]int{"a": 1}
		resetTally(t2)
		t2["c"] = 3
		t3 := map[string]int{}
		resetTally(t3)
		var t4 map[string]int
		resetTally(t4)
		return []testCase{
			tc(`resetTally({a:1 b:2})`, map[string]int{}, t1),
			tc(`resetTally({a:1}) then tally["c"] = 3`, map[string]int{"c": 3}, t2),
			tc(`resetTally({})`, map[string]int{}, t3),
			tc(`resetTally(nil) -- no panic`, true, t4 == nil),
			uses(`\bclear\(`, "clear"),
			avoids(`\bfor\b`, "a delete loop"),
		}
	})
}
