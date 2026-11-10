package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`disabilityAmount({Seniority: 5, MonthsDisabled: 2, Salary: 5000})`, 500, disabilityAmount(Employee{Seniority: 5, MonthsDisabled: 2, Salary: 5000})),
			tc(`disabilityAmount({Seniority: 1, Salary: 5000})`, 0, disabilityAmount(Employee{Seniority: 1, Salary: 5000})),
			tc(`disabilityAmount({Seniority: 5, MonthsDisabled: 13, Salary: 5000})`, 0, disabilityAmount(Employee{Seniority: 5, MonthsDisabled: 13, Salary: 5000})),
			tc(`disabilityAmount({Seniority: 5, IsPartTime: true, Salary: 5000})`, 0, disabilityAmount(Employee{Seniority: 5, IsPartTime: true, Salary: 5000})),
			tc(`disabilityAmount(Employee{})`, 0, disabilityAmount(Employee{})),
			uses(`\|\|`, "the checks combined with ||"),
			avoids(`(?s)return 0.*return 0`, "the same return repeated per check"),
		}
	})
}
