package main

import "fmt"

func userIndex(users []string, name string) (int, error) {
	for i, u := range users {
		if u == name {
			return i, nil
		}
	}
	return 0, fmt.Errorf("no user %q", name)
}
