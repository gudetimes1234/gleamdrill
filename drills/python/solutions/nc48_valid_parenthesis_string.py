def checkValidString(s):
    # Rather than guessing what each star should be, carry the *range* of open
    # counts still possible: low if every star so far were a closer, high if
    # every one were an opener. High going negative means even the most generous
    # reading has too many closers; low is clamped at zero because a star can
    # always be nothing.
    low = high = 0  # @1

    for c in s:  # @2
        if c == "(":  # @3
            low, high = low + 1, high + 1  # @4
        elif c == ")":  # @5
            low, high = max(low - 1, 0), high - 1  # @6
        else:  # @7
            low, high = max(low - 1, 0), high + 1  # @8
        if high < 0:  # @9
            return False  # @9

    return low == 0  # @10
