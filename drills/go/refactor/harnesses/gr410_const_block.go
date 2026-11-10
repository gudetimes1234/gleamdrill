package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`canView("viewer")`, true, canView("viewer")),
			tc(`canEdit("viewer")`, false, canEdit("viewer")),
			tc(`canDelete("admin")`, true, canDelete("admin")),
			tc(`canEdit("")`, false, canEdit("")),
			tc(`canView("Admin") -- case matters`, false, canView("Admin")),
			uses(`(?m)^const\s*\(`, "a const block"),
			avoids(`==\s*"`, "comparing against string literals"),
		}
	})
}
