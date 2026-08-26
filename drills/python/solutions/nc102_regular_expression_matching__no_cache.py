def isMatch(s, p):
    # The same rules with no table at all. Shorter and easier to trust, and
    # exponential on patterns like "a*a*a*a*b" where the same suffix is reached
    # along many different splits. Worth writing first, then adding the cache
    # once it is right.
    if not p:
        return not s

    here = bool(s) and p[0] in (s[0], ".")

    if len(p) >= 2 and p[1] == "*":
        return isMatch(s, p[2:]) or (here and isMatch(s[1:], p))

    return here and isMatch(s[1:], p[1:])
