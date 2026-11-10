package main

func canView(role string) bool {
	return role == "admin" || role == "editor" || role == "viewer"
}

func canEdit(role string) bool {
	return role == "admin" || role == "editor"
}

func canDelete(role string) bool {
	return role == "admin"
}
