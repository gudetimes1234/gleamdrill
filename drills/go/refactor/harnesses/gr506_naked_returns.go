package main

func kv(s string) []any {
	k, v, ok := parseKV(s)
	return []any{k, v, ok}
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`parseKV("a=1")`, []any{"a", "1", true}, kv("a=1")),
			tc(`parseKV("a=b=c")`, []any{"a", "b=c", true}, kv("a=b=c")),
			tc(`parseKV("x=")`, []any{"x", "", true}, kv("x=")),
			tc(`parseKV("noequals")`, []any{"", "", false}, kv("noequals")),
			tc(`parseKV("")`, []any{"", "", false}, kv("")),
			uses(`return\s+[^\s}]`, "returns that list their values"),
			avoids(`(?m)^\s*return\s*$`, "naked returns"),
		}
	})
}
