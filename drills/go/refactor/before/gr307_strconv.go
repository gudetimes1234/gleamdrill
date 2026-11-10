package main

import "fmt"

func nextTicket(id string) (string, error) {
	var n int
	if _, err := fmt.Sscanf(id, "%d", &n); err != nil {
		return "", fmt.Errorf("bad ticket id %q", id)
	}
	return fmt.Sprintf("%d", n+1), nil
}
