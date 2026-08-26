def generateParenthesis(n):
    out = []

    # Two counters, one rule each: an opener is legal while any are left, and a
    # closer is legal only while more are outstanding than openers. Everything
    # reached with both at zero is valid by construction.
    def build(open_left, close_left, current):
        if open_left == 0 and close_left == 0:
            out.append("".join(current))
            return
        if open_left > 0:
            current.append("(")
            build(open_left - 1, close_left, current)
            current.pop()
        if close_left > open_left:
            current.append(")")
            build(open_left, close_left - 1, current)
            current.pop()

    build(n, n, [])
    return out
