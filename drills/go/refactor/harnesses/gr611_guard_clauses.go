package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`payAmount({Salary: 1000})`, 1000, payAmount(Employee{Salary: 1000})),
			tc(`payAmount({Salary: 1000, Retired: true})`, 500, payAmount(Employee{Salary: 1000, Retired: true})),
			tc(`payAmount({Salary: 1000, Separated: true})`, 0, payAmount(Employee{Salary: 1000, Separated: true})),
			tc(`payAmount({Salary: 1000, Separated: true, Retired: true})`, 0, payAmount(Employee{Salary: 1000, Separated: true, Retired: true})),
			tc(`payAmount(Employee{})`, 0, payAmount(Employee{})),
			uses(`if[^{]*\{\s*return\b`, "an early return"),
			avoids(`\belse\b`, "else branches"),
		}
	})
}
