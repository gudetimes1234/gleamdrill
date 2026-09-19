package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("isHappy(19)", true, isHappy(19)),
			tc("isHappy(2)", false, isHappy(2)),
			tc("isHappy(1)", true, isHappy(1)),
			tc("isHappy(7)", true, isHappy(7)),
			tc("isHappy(4)", false, isHappy(4)),
		}
	})
}
