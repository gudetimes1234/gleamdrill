package main

// Each entry remembers the minimum of everything at or below it, so the
// minimum is always the top's note and never needs recomputing on pop.
type MinStack struct {
	values []int
	mins   []int
}

func Constructor() MinStack {
	return MinStack{}
}

func (s *MinStack) Push(val int) {
	s.values = append(s.values, val)
	if len(s.mins) == 0 || val < s.mins[len(s.mins)-1] {
		s.mins = append(s.mins, val)
	} else {
		s.mins = append(s.mins, s.mins[len(s.mins)-1])
	}
}

func (s *MinStack) Pop() {
	s.values = s.values[:len(s.values)-1]
	s.mins = s.mins[:len(s.mins)-1]
}

func (s *MinStack) Top() int {
	return s.values[len(s.values)-1]
}

func (s *MinStack) GetMin() int {
	return s.mins[len(s.mins)-1]
}
