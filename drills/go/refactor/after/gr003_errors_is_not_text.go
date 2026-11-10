package main

import (
	"errors"
	"fmt"
)

var ErrNoPrice = errors.New("no price")

func lookupPrice(prices map[string]int, item string) (int, error) {
	p, ok := prices[item]
	if !ok {
		return 0, ErrNoPrice
	}
	if p < 0 {
		return 0, fmt.Errorf("negative price for %s", item)
	}
	return p, nil
}

func priceOrZero(prices map[string]int, item string) (int, error) {
	p, err := lookupPrice(prices, item)
	if errors.Is(err, ErrNoPrice) {
		return 0, nil
	}
	return p, err
}
