package main

import "fmt"

func userIndex(users []string, name string) (int, error) {
	idx := -1
	for i, u := range users {
		if u == name {
			idx = i
			break
		}
	}
	if idx == -1 {
		return 0, fmt.Errorf("no user %q", name)
	}
	return idx, nil
}
