package main

import "fmt"

func charge(balance, amount int) error {
	if amount > balance {
		return fmt.Errorf("short by %d", amount-balance)
	}
	return nil
}

func shortfall(err error) int {
	if err == nil {
		return 0
	}
	var n int
	if _, scanErr := fmt.Sscanf(err.Error(), "short by %d", &n); scanErr != nil {
		return 0
	}
	return n
}
