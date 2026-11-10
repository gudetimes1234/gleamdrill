package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`scoreTable([]string{"ann", "bob"}, []int{90, 7})`, "ann     90\nbob      7\n", scoreTable([]string{"ann", "bob"}, []int{90, 7})),
			tc(`scoreTable([]string{"maximus"}, []int{1234})`, "maximus1234\n", scoreTable([]string{"maximus"}, []int{1234})),
			tc("scoreTable(nil, nil)", "", scoreTable(nil, nil)),
			avoids(`WriteString\(\s*fmt\.Sprint`, "WriteString(fmt.Sprintf(...))"),
			uses(`fmt\.Fprint\w*\(`, "fmt.Fprintf"),
		}
	})
}
