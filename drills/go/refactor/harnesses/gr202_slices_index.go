package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`position([]string{"ann", "bob", "cy"}, "bob")`, 1, position([]string{"ann", "bob", "cy"}, "bob")),
			tc(`position([]string{"ann", "bob"}, "zed") -- absent`, -1, position([]string{"ann", "bob"}, "zed")),
			tc(`position([]string{"a", "b", "a"}, "a") -- first match`, 0, position([]string{"a", "b", "a"}, "a")),
			tc(`position(nil, "ann")`, -1, position(nil, "ann")),
			uses(`slices\.Index\(`, "slices.Index"),
			avoids(`\bfor\b`, "a hand-written search loop"),
		}
	})
}
