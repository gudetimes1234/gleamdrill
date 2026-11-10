package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`grade(95)`, "A", grade(95)),
			tc(`grade(80) -- on the boundary`, "B", grade(80)),
			tc(`grade(72)`, "C", grade(72)),
			tc(`grade(0)`, "F", grade(0)),
			uses(`\bswitch\s*\{`, "a switch with no tag"),
			avoids(`else\s+if`, "an else-if chain"),
		}
	})
}
