package main

import "strconv"

func sumAll(items []string) (int, error) {
	total := 0
	for _, s := range items {
		n, err := strconv.Atoi(s)
		if err != nil {
			return 0, err
		}
		total += n
	}
	return total, nil
}
