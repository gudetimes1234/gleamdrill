package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`cleanAll([]string{"a\tb", "c\r"})`, []string{"a b", "c"}, cleanAll([]string{"a\tb", "c\r"})),
			tc(`cleanAll([]string{"plain"})`, []string{"plain"}, cleanAll([]string{"plain"})),
			tc(`cleanAll(nil)`, []string{}, cleanAll(nil)),
			uses(`\w+\.Replace\s*\)`, "the method value r.Replace"),
			avoids(`func\(\s*\w+\s+string\s*\)\s*string\s*\{`, "a closure that only forwards to a method"),
		}
	})
}
