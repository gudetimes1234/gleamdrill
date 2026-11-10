package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`describe(login("ann"))`, "ann logged in", describe(login("ann"))),
			tc(`describe(payment("bo", 30))`, "bo paid 30", describe(payment("bo", 30))),
			tc(`describe(payment("", 0))`, " paid 0", describe(payment("", 0))),
			uses(`\.\(type\)`, "a type switch"),
			avoids(`\bKind\b`, "a Kind field"),
		}
	})
}
