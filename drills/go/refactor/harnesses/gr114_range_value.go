package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`countLong([]string{"ok", "too long"}, 3)`, 1, countLong([]string{"ok", "too long"}, 3)),
			tc(`countLong([]string{"abc"}, 3) -- exactly the limit`, 0, countLong([]string{"abc"}, 3)),
			tc(`countLong([]string{"a", "bb", "ccc"}, 0)`, 3, countLong([]string{"a", "bb", "ccc"}, 0)),
			tc(`countLong(nil, 0)`, 0, countLong(nil, 0)),
			uses(`\brange\b`, "a range loop"),
			avoids(`for\s+\w+\s*:=\s*0\s*;`, "a counter loop"),
		}
	})
}
