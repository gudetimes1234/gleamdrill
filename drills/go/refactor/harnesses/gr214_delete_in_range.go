package main

func main() {
	run(func() []testCase {
		s1 := map[string]int{"a": 5, "b": 10, "c": 3}
		expire(s1, 5)
		s2 := map[string]int{"x": 9}
		expire(s2, 0)
		s3 := map[string]int{"x": 1, "y": 2}
		expire(s3, 2)
		s4 := map[string]int{}
		expire(s4, 1)
		return []testCase{
			tc(`expire({a:5 b:10 c:3}, 5)`, map[string]int{"b": 10}, s1),
			tc(`expire({x:9}, 0) -- nothing stale`, map[string]int{"x": 9}, s2),
			tc(`expire({x:1 y:2}, 2) -- everything stale`, map[string]int{}, s3),
			tc(`expire({}, 1)`, map[string]int{}, s4),
			uses(`\bdelete\(`, "delete"),
			avoids(`\bappend\(`, "a scratch slice of keys"),
		}
	})
}
