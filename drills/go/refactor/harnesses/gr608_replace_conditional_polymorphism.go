package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`pay(engineer(5000))`, 5000, pay(engineer(5000))),
			tc(`pay(manager(6000, 1500))`, 7500, pay(manager(6000, 1500))),
			tc(`pay(salesperson(3000, 20000))`, 5000, pay(salesperson(3000, 20000))),
			tc(`pay(salesperson(3000, 0))`, 3000, pay(salesperson(3000, 0))),
			uses(`interface\s*\{`, "an Employee interface"),
			avoids(`\bswitch\b`, "a switch over the kinds"),
			avoids(`\bKind\b`, "a Kind field"),
		}
	})
}
