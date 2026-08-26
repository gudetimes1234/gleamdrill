def numDecodings(s):
    if not s:
        return 0

    # Two rolling counts. The ways to decode up to here are the ways up to the
    # previous character (if this one can stand alone) plus the ways up to the
    # one before that (if this one and its predecessor form a legal pair). A
    # leading zero kills the first branch; anything outside 10..26 the second.
    two_back, one_back = 1, 1
    for i, c in enumerate(s):
        alone = 0 if c == "0" else one_back
        paired = two_back if i > 0 and 10 <= int(s[i - 1:i + 1]) <= 26 else 0
        two_back, one_back = one_back, alone + paired

    return one_back
