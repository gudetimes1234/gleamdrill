package main

type Account struct {
	Balance int
}

func (a Account) Deposit(amount int) Account {
	a.Balance += amount
	return a
}

func balanceAfter(deposits []int) int {
	var acct Account
	for _, d := range deposits {
		acct = acct.Deposit(d)
	}
	return acct.Balance
}
