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
			tc(`register("ann")`, "<nil>", errText(register("ann"))),
			tc(`register("   ")`, "register: name is blank", errText(register("   "))),
			tc(`register("")`, "register: name is blank", errText(register(""))),
			tc(`register("bartholomew-the-great")`, "register: name is too long", errText(register("bartholomew-the-great"))),
			avoids(`(?m)^\s*\w+\s*:?=\s*check\w*\(`, "err assigned on its own line"),
			uses(`if\s+\w+\s*:=[^;\n]+;\s*\w+\s*!=\s*nil`, "the scoped if err := ...; err != nil form"),
		}
	})
}
