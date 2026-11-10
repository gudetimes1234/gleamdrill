package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`displayName({"ann": "Annie"}, "ann")`, "Annie", displayName(map[string]string{"ann": "Annie"}, "ann")),
			tc(`displayName({"ann": "Annie"}, "bob") -- missing key`, "bob", displayName(map[string]string{"ann": "Annie"}, "bob")),
			tc(`displayName(nil, "cy") -- nil map`, "cy", displayName(nil, "cy")),
			tc(`displayName({"a": "A", "b": "B"}, "b")`, "B", displayName(map[string]string{"a": "A", "b": "B"}, "b")),
			uses(`\w+\s*,\s*\w+\s*:?=\s*\w+\[`, "a comma-ok lookup"),
			avoids(`\]\s*!=\s*""`, "a check against the empty string"),
		}
	})
}
