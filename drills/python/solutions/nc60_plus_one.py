def plusOne(digits):
    # Adding one is a carry that starts at 1 and dies as soon as a digit below
    # nine absorbs it. The only interesting case is when it never does, and the
    # number grows a digit.
    out = []  # @1
    carry = 1  # @2
    for digit in reversed(digits):  # @3
        total = digit + carry  # @4
        out.append(total % 10)  # @5
        carry = total // 10  # @6

    if carry:  # @7
        out.append(carry)  # @7
    return out[::-1]  # @8
