def multiply(num1, num2):
    if num1 == "0" or num2 == "0":
        return "0"

    # Long multiplication exactly as taught: one partial product per digit of
    # the second number, each shifted left by its position, all added up. It
    # needs string addition as well as string multiplication, which is why the
    # accumulating version exists -- but writing add once is worth it.
    total = "0"
    for shift, digit in enumerate(reversed(num2)):
        total = add(total, timesDigit(num1, int(digit)) + "0" * shift)
    return total


def timesDigit(number, digit):
    out = []
    carry = 0
    for c in reversed(number):
        product = int(c) * digit + carry
        out.append(product % 10)
        carry = product // 10
    if carry:
        out.append(carry)
    return "".join(str(d) for d in reversed(out)).lstrip("0") or "0"


def add(left, right):
    out = []
    carry = 0
    i, j = len(left) - 1, len(right) - 1
    while i >= 0 or j >= 0 or carry:
        total = carry
        if i >= 0:
            total += int(left[i])
            i -= 1
        if j >= 0:
            total += int(right[j])
            j -= 1
        out.append(total % 10)
        carry = total // 10
    return "".join(str(d) for d in reversed(out)).lstrip("0") or "0"
