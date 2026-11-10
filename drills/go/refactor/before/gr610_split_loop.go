package main

import "fmt"

type Person struct {
	Age, Salary int
}

func summary(people []Person) string {
	if len(people) == 0 {
		return "no one"
	}
	youngest := people[0].Age
	payroll := 0
	for _, p := range people {
		if p.Age < youngest {
			youngest = p.Age
		}
		payroll += p.Salary
	}
	return fmt.Sprintf("youngest %d, payroll %d", youngest, payroll)
}
