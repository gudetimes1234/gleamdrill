package main

func main() {
	run(func() []testCase {
		chat := []string{"hi @ann", "lunch?", "@ann @bob ship it", "ann is out"}
		return []testCase{
			tc(`countMentions(chat, "ann")`, 2, countMentions(chat, "ann")),
			tc(`countMentions(chat, "bob")`, 1, countMentions(chat, "bob")),
			tc(`countMentions(chat, "cy")`, 0, countMentions(chat, "cy")),
			tc(`countMentions(nil, "ann")`, 0, countMentions(nil, "ann")),
			avoids(`strings\.Index`, "strings.Index"),
			uses(`strings\.Contains\(`, "strings.Contains"),
		}
	})
}
