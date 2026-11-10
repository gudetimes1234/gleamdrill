package main

func isAdmin(roles []string) bool {
	found := false
	for _, role := range roles {
		if role == "admin" {
			found = true
		}
	}
	return found
}
