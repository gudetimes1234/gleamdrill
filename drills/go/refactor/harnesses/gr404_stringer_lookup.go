package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`report(Active)`, "status: active", report(Active)),
			tc(`report(Pending)`, "status: pending", report(Pending)),
			tc(`report(Closed)`, "status: closed", report(Closed)),
			tc(`report(Status(7)) -- out of range`, "status: unknown", report(Status(7))),
			uses(`\)\s*String\(\)\s*string\b`, "a String method"),
			uses(`\]string\s*\{`, "a table of names"),
			avoids(`\bswitch\b`, "a switch over every value"),
		}
	})
}
