package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("countdown(3)", "3...2...1...liftoff", countdown(3)),
			tc("countdown(0)", "liftoff", countdown(0)),
			tc("countdown(1)", "1...liftoff", countdown(1)),
			uses(`strings\.Builder`, "a strings.Builder"),
			avoids(`\+=`, "string += in a loop"),
		}
	})
}
