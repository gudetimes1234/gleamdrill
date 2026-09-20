package main

// The second stack holds only the running minima: push to it when a new
// value ties or beats the current minimum, pop from it when that value leaves.
type MinStack struct {
	values []int
	mins   []int
}

func Constructor() MinStack {
	return MinStack{}
}

func (s *MinStack) Push(val int) {
	s.values = append(s.values, val)
	if len(s.mins) == 0 || val <= s.mins[len(s.mins)-1] {
		s.mins = append(s.mins, val)
	}
}

func (s *MinStack) Pop() {
	top := s.values[len(s.values)-1]
	s.values = s.values[:len(s.values)-1]
	if top == s.mins[len(s.mins)-1] {
		s.mins = s.mins[:len(s.mins)-1]
	}
}

func (s *MinStack) Top() int {
	return s.values[len(s.values)-1]
}

func (s *MinStack) GetMin() int {
	return s.mins[len(s.mins)-1]
}
