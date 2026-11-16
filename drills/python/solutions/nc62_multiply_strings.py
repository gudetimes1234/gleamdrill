def multiply(num1, num2):
    if num1 == "0" or num2 == "0":  # @1
        return "0"  # @1

    a = [int(c) for c in reversed(num1)]  # @2
    b = [int(c) for c in reversed(num2)]  # @3

    # Long multiplication with the carrying postponed. Digit i of one number
    # times digit j of the other always lands at position i + j, so every
    # product can be dropped straight into its slot and the carries settled in
    # one sweep at the end.
    slots = [0] * (len(a) + len(b))  # @4
    for i, x in enumerate(a):  # @5
        for j, y in enumerate(b):  # @6
            slots[i + j] += x * y  # @7

    carry = 0  # @8
    digits = []  # @9
    for slot in slots:  # @10
        total = slot + carry  # @11
        digits.append(total % 10)  # @12
        carry = total // 10  # @13

    return "".join(str(d) for d in reversed(digits)).lstrip("0") or "0"  # @14
