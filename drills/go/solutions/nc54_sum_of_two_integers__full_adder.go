package main

func getSum(a int, b int) int {
	// One bit at a time, with an explicit carry, over 32-bit two's complement.
	x, y := uint32(int32(a)), uint32(int32(b))
	var result, carry uint32
	for i := 0; i < 32; i++ {
		bitA := (x >> i) & 1
		bitB := (y >> i) & 1
		sum := bitA ^ bitB ^ carry
		carry = (bitA & bitB) | (bitA & carry) | (bitB & carry)
		result |= sum << i
	}
	return int(int32(result))
}
