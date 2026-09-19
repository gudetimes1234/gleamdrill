package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("leastInterval(['A','A','A','B','B','B'], 2)", 8, leastInterval([]byte("AAABBB"), 2)),
			tc("leastInterval(['A','A','A','B','B','B'], 0)", 6, leastInterval([]byte("AAABBB"), 0)),
			tc("leastInterval(['A','A','A','B','B','B'], 3)", 10, leastInterval([]byte("AAABBB"), 3)),
			tc("leastInterval([], 2)", 0, leastInterval([]byte{}, 2)),
			tc("leastInterval(['A'], 5)", 1, leastInterval([]byte("A"), 5)),
			tc("leastInterval(four As and six singles, 2)", 10, leastInterval([]byte("AAAABCDEFG"), 2)),
		}
	})
}
