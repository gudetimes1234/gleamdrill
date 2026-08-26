def plusOne(digits):
    # Adding one is a carry that starts at 1 and dies as soon as a digit below
    # nine absorbs it. The only interesting case is when it never does, and the
    # number grows a digit.
    out = []
    carry = 1
    for digit in reversed(digits):
        total = digit + carry
        out.append(total % 10)
        carry = total // 10

    if carry:
        out.append(carry)
    return out[::-1]
