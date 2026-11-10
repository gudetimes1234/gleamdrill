package main

import "fmt"

type Point struct {
	X, Y int
}

func (p Point) String() string {
	return fmt.Sprintf("(%d, %d)", p.X, p.Y)
}

func label(name string, p Point) string {
	return fmt.Sprintf("%s at %v", name, p)
}
