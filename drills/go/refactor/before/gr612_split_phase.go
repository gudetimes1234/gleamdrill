package main

import (
	"strconv"
	"strings"
)

func orderTotal(line string) int {
	fields := strings.Fields(line)
	qty, _ := strconv.Atoi(fields[1])
	price, _ := strconv.Atoi(fields[2])
	total := qty * price
	if qty >= 10 {
		total = total * 90 / 100
	}
	return total
}
