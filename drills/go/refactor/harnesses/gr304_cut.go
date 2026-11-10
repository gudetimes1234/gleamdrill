package main

func triple(key, value string, found bool) []any {
	return []any{key, value, found}
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`splitSetting("port=8080")`, []any{"port", "8080", true}, triple(splitSetting("port=8080"))),
			tc(`splitSetting("a=b=c")`, []any{"a", "b=c", true}, triple(splitSetting("a=b=c"))),
			tc(`splitSetting("=x")`, []any{"", "x", true}, triple(splitSetting("=x"))),
			tc(`splitSetting("debug")`, []any{"debug", "", false}, triple(splitSetting("debug"))),
			tc(`splitSetting("")`, []any{"", "", false}, triple(splitSetting(""))),
			avoids(`strings\.Index`, "strings.Index"),
			uses(`strings\.Cut\(`, "strings.Cut"),
		}
	})
}
