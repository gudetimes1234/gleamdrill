OPERATORS = "+-*/"


def evalRPN(tokens):
    stack = []  # @1
    for token in tokens:  # @2
        if token in OPERATORS and len(stack) >= 2:  # @3
            b = stack.pop()  # @4
            a = stack.pop()  # @4
            stack.append(apply(token, a, b))  # @5
        else:  # @6
            stack.append(int(token))  # @6
    return stack[-1] if stack else 0  # @7


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
