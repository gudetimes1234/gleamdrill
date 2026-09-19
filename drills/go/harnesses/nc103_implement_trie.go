package main

func main() {
	run(func() []testCase {
		t := Constructor()
		t.Insert("apple")
		cases := []testCase{
			tc("search('apple') after inserting it", true, t.Search("apple")),
			tc("search('app') -- a prefix, not a word", false, t.Search("app")),
			tc("startsWith('app')", true, t.StartsWith("app")),
			tc("startsWith('b')", false, t.StartsWith("b")),
		}
		t.Insert("app")
		cases = append(cases, tc("search('app') after inserting it too", true, t.Search("app")))
		return cases
	})
}
