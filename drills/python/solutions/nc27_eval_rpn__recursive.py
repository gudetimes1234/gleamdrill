OPERATORS = "+-*/"


def evalRPN(tokens):
    value, _ = take(tokens, len(tokens) - 1)
    return value


# Read right to left: the last token is the outermost operator, and each
# operator takes its right operand first because that is what sits nearer the
# end. Returns the value and the index still to be read.
def take(tokens, i):
    token = tokens[i]
    if token not in OPERATORS:
        return int(token), i - 1
    right, i = take(tokens, i - 1)
    left, i = take(tokens, i)
    return apply(token, left, right), i


def apply(operator, a, b):
    if operator == "+":
        return a + b
    if operator == "-":
        return a - b
    if operator == "*":
        return a * b
    quotient = abs(a) // abs(b)
    return -quotient if (a < 0) != (b < 0) else quotient
