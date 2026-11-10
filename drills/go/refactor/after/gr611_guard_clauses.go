package main

type Employee struct {
	Salary    int
	Separated bool
	Retired   bool
}

func payAmount(e Employee) int {
	if e.Separated {
		return 0
	}
	if e.Retired {
		return e.Salary / 2
	}
	return e.Salary
}
