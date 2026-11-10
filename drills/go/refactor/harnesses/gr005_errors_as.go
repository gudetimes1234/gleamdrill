package main

import "errors"

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`badField(&FieldError{"email"})`, "email", badField(&FieldError{"email"})),
			tc(`badField(&FieldError{"age"})`, "age", badField(&FieldError{"age"})),
			tc(`badField(errors.New("boom"))`, "", badField(errors.New("boom"))),
			tc("badField(nil)", "", badField(nil)),
			avoids(`\.\(\s*\*?\w+\s*\)|\.\(type\)`, "a type assertion on the error"),
			uses(`errors\.As\(`, "errors.As"),
		}
	})
}
