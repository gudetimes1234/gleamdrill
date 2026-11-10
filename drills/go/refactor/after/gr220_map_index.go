package main

type User struct {
	ID   int
	Name string
}

type Order struct {
	UserID int
	Total  int
}

func totalsByName(users []User, orders []Order) map[string]int {
	names := make(map[int]string, len(users))
	for _, u := range users {
		names[u.ID] = u.Name
	}
	out := map[string]int{}
	for _, o := range orders {
		if name, ok := names[o.UserID]; ok {
			out[name] += o.Total
		}
	}
	return out
}
