need :is_palindrome

tc 'is_palindrome("A man, a plan, a canal: Panama")', true, is_palindrome("A man, a plan, a canal: Panama")
tc 'is_palindrome("race a car")', false, is_palindrome("race a car")
tc 'is_palindrome(" ")', true, is_palindrome(" ")
tc 'is_palindrome("0P")', false, is_palindrome("0P")
