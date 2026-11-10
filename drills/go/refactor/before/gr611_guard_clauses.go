package main

type Employee struct {
	Salary    int
	Separated bool
	Retired   bool
}

func payAmount(e Employee) int {
	var result int
	if e.Separated {
		result = 0
	} else {
		if e.Retired {
			result = e.Salary / 2
		} else {
			result = e.Salary
		}
	}
	return result
}
