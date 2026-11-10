package main

import (
	"errors"
	"fmt"
)

func main() {
	run(func() []testCase {
		return []testCase{
			tc("shouldRetry(ErrTimeout)", true, shouldRetry(ErrTimeout)),
			tc(`shouldRetry(fmt.Errorf("dial db: %w", ErrTimeout))`, true, shouldRetry(fmt.Errorf("dial db: %w", ErrTimeout))),
			tc(`shouldRetry(fmt.Errorf("query: %w", fmt.Errorf("dial: %w", ErrTimeout)))`, true, shouldRetry(fmt.Errorf("query: %w", fmt.Errorf("dial: %w", ErrTimeout)))),
			tc(`shouldRetry(errors.New("connection refused"))`, false, shouldRetry(errors.New("connection refused"))),
			tc("shouldRetry(nil)", false, shouldRetry(nil)),
			avoids(`\.Error\(\)`, "looking inside err.Error()"),
			uses(`errors\.Is\(`, "errors.Is"),
		}
	})
}
