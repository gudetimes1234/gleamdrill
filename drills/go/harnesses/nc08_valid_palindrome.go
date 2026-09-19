package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("isPalindrome('A man, a plan, a canal: Panama')", true, isPalindrome("A man, a plan, a canal: Panama")),
			tc("isPalindrome('race a car')", false, isPalindrome("race a car")),
			tc("isPalindrome(' ')", true, isPalindrome(" ")),
			tc("isPalindrome('0P')", false, isPalindrome("0P")),
		}
	})
}
