package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`sumUntilStop([]string{"1", "2", "stop", "5"})`, 3, sumUntilStop([]string{"1", "2", "stop", "5"})),
			tc(`sumUntilStop([]string{"4", "skip", "6"}) -- no stop`, 10, sumUntilStop([]string{"4", "skip", "6"})),
			tc(`sumUntilStop([]string{"stop", "9"})`, 0, sumUntilStop([]string{"stop", "9"})),
			tc(`sumUntilStop(nil)`, 0, sumUntilStop(nil)),
			uses(`\bbreak\s+[A-Za-z_]\w*|case\s+"stop"\s*:\s*return\b`, "a labeled break"),
			avoids(`=\s*(true|false)\b`, "a done flag"),
		}
	})
}
