package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`headlines([]string{"intro", "", "// note", "end"})`, []string{"INTRO", "END"}, headlines([]string{"intro", "", "// note", "end"})),
			tc(`headlines([]string{"go"})`, []string{"GO"}, headlines([]string{"go"})),
			tc(`headlines([]string{"", "//x"}) -- all skipped`, []string{}, headlines([]string{"", "//x"})),
			tc(`headlines(nil)`, []string{}, headlines(nil)),
			uses(`\bcontinue\b`, "continue"),
			avoids(`\bif\b[^{}]*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\bif\b`, "an if nested in an if"),
		}
	})
}
