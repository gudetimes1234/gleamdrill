package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`validate("ana", 30)`, "ok", validate("ana", 30)),
			tc(`validate("", 30)`, "missing name", validate("", 30)),
			tc(`validate("bo", -1)`, "negative age", validate("bo", -1)),
			tc(`validate("cy", 150) -- on the limit`, "age too large", validate("cy", 150)),
			tc(`validate("", -5) -- name is checked first`, "missing name", validate("", -5)),
			avoids(`\belse\b`, "else branches"),
			avoids(`\bif\b[^{}]*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\bif\b`, "an if nested in an if"),
		}
	})
}
