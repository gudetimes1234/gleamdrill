need :generate_parenthesis

# Any order is acceptable, so every case compares sorted.
def sorted(n) = generate_parenthesis(n).sort

tc "generate_parenthesis(1)", ["()"], sorted(1)
tc "generate_parenthesis(2)", ["(())", "()()"], sorted(2)
tc "generate_parenthesis(3)", ["((()))", "(()())", "(())()", "()(())", "()()()"], sorted(3)
tc "generate_parenthesis(4) count", 14, sorted(4).length
