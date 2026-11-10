package main

import "fmt"

type User struct {
	Name string
	Age  int
}

func newUser(name string, age int) User {
	return User{Name: name, Age: age}
}

func describe(u User) string {
	return fmt.Sprintf("%s (%d)", u.Name, u.Age)
}

func profileLine(name string, age int) string {
	return describe(newUser(name, age))
}
