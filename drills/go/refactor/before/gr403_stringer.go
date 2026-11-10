package main

import "fmt"

type Point struct {
	X, Y int
}

func describePoint(p Point) string {
	return fmt.Sprintf("(%d, %d)", p.X, p.Y)
}

func label(name string, p Point) string {
	return name + " at " + describePoint(p)
}
