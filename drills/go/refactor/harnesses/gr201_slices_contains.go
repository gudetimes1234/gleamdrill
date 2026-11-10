package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`isAdmin([]string{"user", "admin"})`, true, isAdmin([]string{"user", "admin"})),
			tc(`isAdmin([]string{"user"})`, false, isAdmin([]string{"user"})),
			tc(`isAdmin(nil) -- no roles`, false, isAdmin(nil)),
			uses(`slices\.Contains\(`, "slices.Contains"),
			avoids(`\bfor\b`, "a hand-written search loop"),
		}
	})
}
