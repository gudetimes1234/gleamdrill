package main

type Status int

const (
	Pending Status = iota
	Active
	Closed
)

var statusNames = []string{"pending", "active", "closed"}

func (s Status) String() string {
	if s < 0 || int(s) >= len(statusNames) {
		return "unknown"
	}
	return statusNames[s]
}

func report(s Status) string {
	return "status: " + s.String()
}
