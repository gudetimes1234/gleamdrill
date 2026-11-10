package main

type Status int

const (
	Pending Status = iota
	Active
	Closed
)

func statusName(s Status) string {
	switch s {
	case Pending:
		return "pending"
	case Active:
		return "active"
	case Closed:
		return "closed"
	}
	return "unknown"
}

func report(s Status) string {
	return "status: " + statusName(s)
}
