package main

type Account struct {
	Balance int
}

func (a *Account) Deposit(amount int) {
	a.Balance += amount
}

func balanceAfter(deposits []int) int {
	var acct Account
	for _, d := range deposits {
		acct.Deposit(d)
	}
	return acct.Balance
}
