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
	for _, p := range people {
		youngest = min(youngest, p.Age)
	}
	payroll := 0
	for _, p := range people {
		payroll += p.Salary
	}
	return fmt.Sprintf("youngest %d, payroll %d", youngest, payroll)
}
