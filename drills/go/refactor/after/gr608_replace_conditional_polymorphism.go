package main

type Employee interface {
	Pay() int
}

type Engineer struct{ Salary int }

type Manager struct{ Salary, Bonus int }

type Salesperson struct{ Salary, Sales int }

func (e Engineer) Pay() int    { return e.Salary }
func (m Manager) Pay() int     { return m.Salary + m.Bonus }
func (s Salesperson) Pay() int { return s.Salary + s.Sales/10 }

func engineer(salary int) Employee { return Engineer{Salary: salary} }

func manager(salary, bonus int) Employee { return Manager{Salary: salary, Bonus: bonus} }

func salesperson(salary, sales int) Employee { return Salesperson{Salary: salary, Sales: sales} }

func pay(e Employee) int {
	return e.Pay()
}
