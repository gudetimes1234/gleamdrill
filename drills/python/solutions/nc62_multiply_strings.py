def multiply(num1, num2):
    if num1 == "0" or num2 == "0":
        return "0"

    a = [int(c) for c in reversed(num1)]
    b = [int(c) for c in reversed(num2)]

    # Long multiplication with the carrying postponed. Digit i of one number
    # times digit j of the other always lands at position i + j, so every
    # product can be dropped straight into its slot and the carries settled in
    # one sweep at the end.
    slots = [0] * (len(a) + len(b))
    for i, x in enumerate(a):
        for j, y in enumerate(b):
            slots[i + j] += x * y

    carry = 0
    digits = []
    for slot in slots:
        total = slot + carry
        digits.append(total % 10)
        carry = total // 10

    return "".join(str(d) for d in reversed(digits)).lstrip("0") or "0"
