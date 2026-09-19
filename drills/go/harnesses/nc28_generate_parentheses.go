package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("generateParenthesis(3)", []string{"((()))", "(()())", "(())()", "()(())", "()()()"}, sortStrings(generateParenthesis(3))),
			tc("generateParenthesis(1)", []string{"()"}, generateParenthesis(1)),
			tc("len(generateParenthesis(4))", 14, len(generateParenthesis(4))),
		}
	})
}
