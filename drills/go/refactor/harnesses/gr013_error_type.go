package main

import "errors"

func errText(err error) string {
	if err == nil {
		return "<nil>"
	}
	return err.Error()
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc("charge(10, 15).Error()", "short by 5", errText(charge(10, 15))),
			tc("charge(10, 5)", "<nil>", errText(charge(10, 5))),
			tc("shortfall(charge(10, 15))", 5, shortfall(charge(10, 15))),
			tc("shortfall(charge(10, 5))", 0, shortfall(charge(10, 5))),
			tc(`shortfall(errors.New("card declined"))`, 0, shortfall(errors.New("card declined"))),
			avoids(`Sscan|\.Error\(\)\s*,`, "parsing err.Error()"),
			uses(`\)\s*Error\(\)\s*string`, "an error type with an Error method"),
		}
	})
}
