package main

type Employee struct {
	Seniority      int
	MonthsDisabled int
	IsPartTime     bool
	Salary         int
}

func isNotEligible(e Employee) bool {
	return e.Seniority < 2 || e.MonthsDisabled > 12 || e.IsPartTime
}

func disabilityAmount(e Employee) int {
	if isNotEligible(e) {
		return 0
	}
	return e.Salary / 10
}
