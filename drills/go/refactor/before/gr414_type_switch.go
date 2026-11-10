package main

import "fmt"

type Event struct {
	Kind   string
	User   string
	Amount int
}

func login(user string) Event {
	return Event{Kind: "login", User: user}
}

func payment(user string, amount int) Event {
	return Event{Kind: "payment", User: user, Amount: amount}
}

func describe(e Event) string {
	switch e.Kind {
	case "login":
		return e.User + " logged in"
	case "payment":
		return fmt.Sprintf("%s paid %d", e.User, e.Amount)
	}
	return "unknown event"
}
