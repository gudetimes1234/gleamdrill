package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`stripScheme("https://go.dev/doc")`, "go.dev/doc", stripScheme("https://go.dev/doc")),
			tc(`stripScheme("http://example.com")`, "http://example.com", stripScheme("http://example.com")),
			tc(`stripScheme("https://")`, "", stripScheme("https://")),
			tc(`stripScheme("")`, "", stripScheme("")),
			avoids(`\[\s*\w*\s*:\s*\w*\s*\]`, "slicing by hand"),
			uses(`strings\.(TrimPrefix|CutPrefix|HasPrefix)\(`, "strings.TrimPrefix"),
		}
	})
}
