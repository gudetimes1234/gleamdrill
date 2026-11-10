package main

type Employee struct {
	Seniority      int
	MonthsDisabled int
	IsPartTime     bool
	Salary         int
}

func disabilityAmount(e Employee) int {
	if e.Seniority < 2 {
		return 0
	}
	if e.MonthsDisabled > 12 {
		return 0
	}
	if e.IsPartTime {
		return 0
	}
	return e.Salary / 10
}
