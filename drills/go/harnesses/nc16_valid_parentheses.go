package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("isValid('()')", true, isValid("()")),
			tc("isValid('()[]{}')", true, isValid("()[]{}")),
			tc("isValid('(]')", false, isValid("(]")),
			tc("isValid('([)]')", false, isValid("([)]")),
			tc("isValid('{[]}')", true, isValid("{[]}")),
			tc("isValid('(')", false, isValid("(")),
			tc("isValid(')')", false, isValid(")")),
		}
	})
}
