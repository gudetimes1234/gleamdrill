package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`totalArea([]Rect{{2, 3}, {1, 1}})`, 7, totalArea([]Rect{{2, 3}, {1, 1}})),
			tc(`totalArea([]Rect{{2.5, 2}})`, 5, totalArea([]Rect{{2.5, 2}})),
			tc(`totalArea(nil)`, 0, totalArea(nil)),
			uses(`func\s*\(\s*\w+\s+\*?Rect\s*\)`, "a method on Rect"),
			avoids(`func\s+\w+\(\s*\w+\s+\*?Rect\s*\)`, "a free function taking a Rect"),
		}
	})
}
