package main

const (
	RoleAdmin  = "admin"
	RoleEditor = "editor"
	RoleViewer = "viewer"
)

func canView(role string) bool {
	return role == RoleAdmin || role == RoleEditor || role == RoleViewer
}

func canEdit(role string) bool {
	return role == RoleAdmin || role == RoleEditor
}

func canDelete(role string) bool {
	return role == RoleAdmin
}
