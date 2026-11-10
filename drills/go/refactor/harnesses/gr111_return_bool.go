package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`canVote(18, true) -- just old enough`, true, canVote(18, true)),
			tc(`canVote(17, true)`, false, canVote(17, true)),
			tc(`canVote(40, false)`, false, canVote(40, false)),
			tc(`canVote(0, false)`, false, canVote(0, false)),
			avoids(`\breturn\s+(true|false)\b`, "returning a literal true or false"),
		}
	})
}
