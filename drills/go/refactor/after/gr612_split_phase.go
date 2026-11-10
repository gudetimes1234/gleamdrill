package main

import (
	"strconv"
	"strings"
)

type orderLine struct {
	qty, price int
}

func parseOrder(line string) orderLine {
	fields := strings.Fields(line)
	qty, _ := strconv.Atoi(fields[1])
	price, _ := strconv.Atoi(fields[2])
	return orderLine{qty: qty, price: price}
}

func priceOrder(o orderLine) int {
	total := o.qty * o.price
	if o.qty >= 10 {
		total = total * 90 / 100
	}
	return total
}

func orderTotal(line string) int {
	return priceOrder(parseOrder(line))
}
