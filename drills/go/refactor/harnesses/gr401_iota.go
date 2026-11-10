package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("Friday", 4, int(Friday)),
			tc("isMidweek(Wednesday)", true, isMidweek(Wednesday)),
			tc("isMidweek(Monday)", false, isMidweek(Monday)),
			tc("isMidweek(Friday)", false, isMidweek(Friday)),
			uses(`=\s*iota\b`, "iota"),
			avoids(`Weekday = [1-9]`, "hand-numbered constants"),
		}
	})
}
