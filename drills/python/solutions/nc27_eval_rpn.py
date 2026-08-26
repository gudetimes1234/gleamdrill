OPERATORS = "+-*/"


def evalRPN(tokens):
    stack = []
    for token in tokens:
        if token in OPERATORS and len(stack) >= 2:
            b = stack.pop()
            a = stack.pop()
            stack.append(apply(token, a, b))
        else:
            stack.append(int(token))
    return stack[-1] if stack else 0


def apply(operator, a, b):
    if operator == "+":
        return a + b
    if operator == "-":
        return a - b
    if operator == "*":
        return a * b
    # // floors, so -3 // 2 is -2; the problem wants truncation towards zero.
    quotient = abs(a) // abs(b)
    return -quotient if (a < 0) != (b < 0) else quotient
