package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`allTags([]string{"go", "web"}, []string{"api"})`, []string{"go", "web", "api"}, allTags([]string{"go", "web"}, []string{"api"})),
			tc(`allTags(nil, []string{"x"})`, []string{"x"}, allTags(nil, []string{"x"})),
			tc(`allTags([]string{"a"}, nil)`, []string{"a"}, allTags([]string{"a"}, nil)),
			tc(`allTags(nil, nil) -- both empty`, []string{}, allTags(nil, nil)),
			uses(`\w\.\.\.\s*\)`, "append with ..."),
			avoids(`\bfor\b`, "a loop of appends"),
		}
	})
}
