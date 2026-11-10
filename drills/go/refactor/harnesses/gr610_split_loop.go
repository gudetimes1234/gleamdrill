package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`summary([]Person{{30, 100}, {25, 200}})`, "youngest 25, payroll 300", summary([]Person{{30, 100}, {25, 200}})),
			tc(`summary([]Person{{40, 0}})`, "youngest 40, payroll 0", summary([]Person{{40, 0}})),
			tc(`summary(nil)`, "no one", summary(nil)),
			uses(`(?s)\bfor\b.*\bfor\b`, "two loops, one per job"),
		}
	})
}
