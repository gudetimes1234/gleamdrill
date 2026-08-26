def generateParenthesis(n):
    return compose(n)


# Every non-empty balanced string is "(" + A + ")" + B for exactly one split: A
# is whatever the first bracket encloses, B is whatever follows it. Enumerating
# the splits enumerates the strings, with no validity rule to check at all.
def compose(n):
    if n <= 0:
        return [""]
    return [
        "(" + a + ")" + b
        for inner in range(n)
        for a in compose(inner)
        for b in compose(n - 1 - inner)
    ]
