package main

func main() {
	run(func() []testCase {
		d := Constructor()
		d.AddWord("bad")
		d.AddWord("dad")
		d.AddWord("mad")
		return []testCase{
			tc("search('pad')", false, d.Search("pad")),
			tc("search('bad')", true, d.Search("bad")),
			tc("search('.ad')", true, d.Search(".ad")),
			tc("search('b..')", true, d.Search("b..")),
			tc("search('...')", true, d.Search("...")),
			tc("search('b') -- too short", false, d.Search("b")),
			tc("search('....') -- too long", false, d.Search("....")),
		}
	})
}
