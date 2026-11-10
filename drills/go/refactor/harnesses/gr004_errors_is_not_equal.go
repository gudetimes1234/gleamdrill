package main

import "errors"

func main() {
	run(func() []testCase {
		return []testCase{
			tc("statusCode(nil)", 200, statusCode(nil)),
			tc("statusCode(ErrNotFound)", 404, statusCode(ErrNotFound)),
			tc("statusCode(ErrForbidden)", 403, statusCode(ErrForbidden)),
			tc(`statusCode(errors.New("disk full"))`, 500, statusCode(errors.New("disk full"))),
			avoids(`==\s*Err\w+`, "== against a sentinel error"),
			uses(`errors\.Is\(`, "errors.Is"),
		}
	})
}
