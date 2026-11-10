package main

import "errors"

func withdraw(balance, amount int) (int, error) {
	if amount <= 0 {
		return balance, errors.New("amount must be positive")
	}
	if amount > balance {
		return balance, errors.New("insufficient funds")
	}
	return balance - amount, nil
}

func reserve(balance, held, amount int) (int, error) {
	if amount > balance-held {
		return held, errors.New("insufficient funds")
	}
	return held + amount, nil
}
