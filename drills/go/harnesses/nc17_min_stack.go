package main

func main() {
	run(func() []testCase {
		s := Constructor()
		s.Push(-2)
		s.Push(0)
		s.Push(-3)
		minWithThree := s.GetMin()
		s.Pop()
		topAfterPop := s.Top()
		minAfterPop := s.GetMin()
		d := Constructor()
		d.Push(2)
		d.Push(2)
		d.Pop()
		return []testCase{
			tc("push -2, 0, -3; getMin", -3, minWithThree),
			tc("pop; top", 0, topAfterPop),
			tc("getMin after pop", -2, minAfterPop),
			tc("push 2, 2; pop; getMin -- a duplicate minimum survives one pop", 2, d.GetMin()),
		}
	})
}
