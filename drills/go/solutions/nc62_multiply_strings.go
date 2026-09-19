package main

import "strings"

func multiply(num1 string, num2 string) string {
	if num1 == "0" || num2 == "0" {
		return "0"
	}
	// Digit i of num1 times digit j of num2 lands at position i+j+1 (and
	// carries into i+j) of the product, counted from the left.
	product := make([]int, len(num1)+len(num2))
	for i := len(num1) - 1; i >= 0; i-- {
		for j := len(num2) - 1; j >= 0; j-- {
			total := int(num1[i]-'0')*int(num2[j]-'0') + product[i+j+1]
			product[i+j+1] = total % 10
			product[i+j] += total / 10
		}
	}
	var b strings.Builder
	for _, d := range product {
		if b.Len() == 0 && d == 0 {
			continue
		}
		b.WriteByte(byte('0' + d))
	}
	return b.String()
}
