package main

func errText(err error) string {
	if err == nil {
		return "<nil>"
	}
	return err.Error()
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`validateSignup("ann", "ann@x.io", 30)`, "<nil>", errText(validateSignup("ann", "ann@x.io", 30))),
			tc(`validateSignup("ann", "ann.x.io", 30)`, "email needs an @", errText(validateSignup("ann", "ann.x.io", 30))),
			tc(`validateSignup("", "nope", 9)`, "name is required\nemail needs an @\nmust be 13 or older", errText(validateSignup("", "nope", 9))),
			tc(`validateSignup("", "a@b", 13)`, "name is required", errText(validateSignup("", "a@b", 13))),
			avoids(`strings\.Join\(`, "strings.Join to build the error"),
			uses(`errors\.Join\(`, "errors.Join"),
		}
	})
}
