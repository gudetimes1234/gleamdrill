package main

import "fmt"

func pair(s string, err error) string {
	return fmt.Sprintf("%q, %v", s, err)
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`nextTicket("41")`, `"42", <nil>`, pair(nextTicket("41"))),
			tc(`nextTicket("-1")`, `"0", <nil>`, pair(nextTicket("-1"))),
			tc(`nextTicket("abc")`, `"", bad ticket id "abc"`, pair(nextTicket("abc"))),
			tc(`nextTicket("")`, `"", bad ticket id ""`, pair(nextTicket(""))),
			avoids(`Sscan|Sprint\w*\(\s*"%d"`, "Sscanf or Sprintf(\"%d\")"),
			uses(`strconv\.(Atoi|ParseInt)\(`, "strconv.Atoi"),
			uses(`strconv\.(Itoa|FormatInt)\(`, "strconv.Itoa"),
		}
	})
}
