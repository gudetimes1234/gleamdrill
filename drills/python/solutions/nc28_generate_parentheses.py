def generateParenthesis(n):
    out = []  # @1

    # Two counters, one rule each: an opener is legal while any are left, and a
    # closer is legal only while more are outstanding than openers. Everything
    # reached with both at zero is valid by construction.
    def build(open_left, close_left, current):
        if open_left == 0 and close_left == 0:  # @2
            out.append("".join(current))  # @3
            return  # @3
        if open_left > 0:  # @4
            current.append("(")  # @5
            build(open_left - 1, close_left, current)  # @6
            current.pop()  # @7
        if close_left > open_left:  # @8
            current.append(")")  # @9
            build(open_left, close_left - 1, current)  # @10
            current.pop()  # @11

    build(n, n, [])  # @12
    return out  # @13
