def checkValidString(s):
    # Rather than guessing what each star should be, carry the *range* of open
    # counts still possible: low if every star so far were a closer, high if
    # every one were an opener. High going negative means even the most generous
    # reading has too many closers; low is clamped at zero because a star can
    # always be nothing.
    low = high = 0

    for c in s:
        if c == "(":
            low, high = low + 1, high + 1
        elif c == ")":
            low, high = max(low - 1, 0), high - 1
        else:
            low, high = max(low - 1, 0), high + 1
        if high < 0:
            return False

    return low == 0
