package main

import (
	"strconv"
	"strings"
)

func countdown(n int) string {
	var b strings.Builder
	for i := n; i > 0; i-- {
		b.WriteString(strconv.Itoa(i))
		b.WriteString("...")
	}
	b.WriteString("liftoff")
	return b.String()
}
