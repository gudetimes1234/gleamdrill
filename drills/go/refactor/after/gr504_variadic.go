package main

import "strings"

func joinPath(parts ...string) string {
	return strings.Join(parts, "/")
}

func userPath(id string) string {
	return joinPath("users", id)
}

func postPath(user, post string) string {
	return joinPath("users", user, "posts", post)
}
