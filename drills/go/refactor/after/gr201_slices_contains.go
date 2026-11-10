package main

import "slices"

func isAdmin(roles []string) bool {
	return slices.Contains(roles, "admin")
}
