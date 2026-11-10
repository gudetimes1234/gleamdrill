package main

import "errors"

var (
	ErrNotPositive       = errors.New("amount must be positive")
	ErrInsufficientFunds = errors.New("insufficient funds")
)

func withdraw(balance, amount int) (int, error) {
	if amount <= 0 {
		return balance, ErrNotPositive
	}
	if amount > balance {
		return balance, ErrInsufficientFunds
	}
	return balance - amount, nil
}

func reserve(balance, held, amount int) (int, error) {
	if amount > balance-held {
		return held, ErrInsufficientFunds
	}
	return held + amount, nil
}
