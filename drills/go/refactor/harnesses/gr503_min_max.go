package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`largest(3, 9, 2)`, 9, largest(3, 9, 2)),
			tc(`largest(-1, -2, -3)`, -1, largest(-1, -2, -3)),
			tc(`clamp(15, 0, 10)`, 10, clamp(15, 0, 10)),
			tc(`clamp(-3, 0, 10)`, 0, clamp(-3, 0, 10)),
			tc(`clamp(7, 0, 10)`, 7, clamp(7, 0, 10)),
			uses(`\bmax\(`, "the max builtin"),
			uses(`\bmin\(`, "the min builtin"),
			avoids(`\bif\b`, "if-chains"),
		}
	})
}
