package main

import (
	"fmt"
	"strconv"
)

func reverseBits(num uint32) uint32 {
	text := []byte(fmt.Sprintf("%032b", num))
	for i, j := 0, len(text)-1; i < j; i, j = i+1, j-1 {
		text[i], text[j] = text[j], text[i]
	}
	result, _ := strconv.ParseUint(string(text), 2, 32)
	return uint32(result)
}
