def isValid(s):
    # No stack: strip every matched pair, over and over, until nothing more can
    # go. Whatever survives is unmatched. This is also why "([)]" fails —
    # neither pair is ever adjacent.
    previous = None
    while previous != s:
        previous = s
        s = s.replace("()", "").replace("[]", "").replace("{}", "")
    return s == ""
