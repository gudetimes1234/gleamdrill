package main

type Employee struct {
	Kind   string
	Salary int
	Extra  int
}

func engineer(salary int) Employee { return Employee{Kind: "engineer", Salary: salary} }

func manager(salary, bonus int) Employee {
	return Employee{Kind: "manager", Salary: salary, Extra: bonus}
}

func salesperson(salary, sales int) Employee {
	return Employee{Kind: "sales", Salary: salary, Extra: sales}
}

func pay(e Employee) int {
	switch e.Kind {
	case "manager":
		return e.Salary + e.Extra
	case "sales":
		return e.Salary + e.Extra/10
	}
	return e.Salary
}
