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
	out := map[string]int{}
	for _, o := range orders {
		for _, u := range users {
			if u.ID == o.UserID {
				out[u.Name] += o.Total
				break
			}
		}
	}
	return out
}
