def checkValidString(s):
    # Two one-sided checks. Left to right with every star an opener asks whether
    # there are ever too many closers; right to left with every star a closer
    # asks whether there are ever too many openers. Passing both is exactly the
    # condition, and each pass is the ordinary balance check.
    return neverNegative(s, "(") and neverNegative(s[::-1], ")")


def neverNegative(s, credit):
    balance = 0
    for c in s:
        balance += 1 if c == credit or c == "*" else -1
        if balance < 0:
            return False
    return True
