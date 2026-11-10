package main

import "strings"

func joinPath(parts []string) string {
	return strings.Join(parts, "/")
}

func userPath(id string) string {
	return joinPath([]string{"users", id})
}

func postPath(user, post string) string {
	return joinPath([]string{"users", user, "posts", post})
}
