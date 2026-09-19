package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("checkValidString('()')", true, checkValidString("()")),
			tc("checkValidString('(*)')", true, checkValidString("(*)")),
			tc("checkValidString('(*))')", true, checkValidString("(*))")),
			tc("checkValidString(')(')", false, checkValidString(")(")),
			tc("checkValidString('(((**')", false, checkValidString("(((**")),
			tc("checkValidString('**((')", false, checkValidString("**((")),
			tc("checkValidString('')", true, checkValidString("")),
		}
	})
}
