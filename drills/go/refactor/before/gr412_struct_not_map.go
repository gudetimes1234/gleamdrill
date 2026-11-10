package main

import "fmt"

func newUser(name string, age int) map[string]any {
	return map[string]any{"name": name, "age": age}
}

func describe(u map[string]any) string {
	return fmt.Sprintf("%s (%d)", u["name"].(string), u["age"].(int))
}

func profileLine(name string, age int) string {
	return describe(newUser(name, age))
}
