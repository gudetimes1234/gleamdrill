package main

import "fmt"

type Event interface{}

type Login struct {
	User string
}

type Payment struct {
	User   string
	Amount int
}

func login(user string) Event {
	return Login{User: user}
}

func payment(user string, amount int) Event {
	return Payment{User: user, Amount: amount}
}

func describe(e Event) string {
	switch e := e.(type) {
	case Login:
		return e.User + " logged in"
	case Payment:
		return fmt.Sprintf("%s paid %d", e.User, e.Amount)
	}
	return "unknown event"
}
