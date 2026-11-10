package main

func main() {
	run(func() []testCase {
		tags := []string{"Go", "Rust", "SQL"}
		return []testCase{
			tc(`hasTag(tags, "go")`, true, hasTag(tags, "go")),
			tc(`hasTag(tags, "sql")`, true, hasTag(tags, "sql")),
			tc(`hasTag(tags, "gopher")`, false, hasTag(tags, "gopher")),
			tc(`hasTag(nil, "go")`, false, hasTag(nil, "go")),
			avoids(`strings\.To(Lower|Upper)\(`, "ToLower or ToUpper"),
			uses(`strings\.EqualFold\(`, "strings.EqualFold"),
		}
	})
}
