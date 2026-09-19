package main

func isValid(s string) bool {
	pairs := map[byte]byte{')': '(', ']': '[', '}': '{'}
	stack := []byte{}
	for i := 0; i < len(s); i++ {
		c := s[i]
		opener, isCloser := pairs[c]
		if !isCloser {
			stack = append(stack, c)
			continue
		}
		if len(stack) == 0 || stack[len(stack)-1] != opener {
			return false
		}
		stack = stack[:len(stack)-1]
	}
	return len(stack) == 0
}
