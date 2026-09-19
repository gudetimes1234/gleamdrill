package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("evalRPN(['2','1','+','3','*'])", 9, evalRPN([]string{"2", "1", "+", "3", "*"})),
			tc("evalRPN(['4','13','5','/','+'])", 6, evalRPN([]string{"4", "13", "5", "/", "+"})),
			tc("evalRPN(['10','6','9','3','+','-11','*','/','*','17','+','5','+'])", 22, evalRPN([]string{"10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"})),
			tc("evalRPN(['7','-3','/'])", -2, evalRPN([]string{"7", "-3", "/"})),
		}
	})
}
