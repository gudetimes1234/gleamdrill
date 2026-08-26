MASK = 0xFFFFFFFF
LARGEST = 0x7FFFFFFF


def getSum(a, b):
    # The same addition written as hardware: thirty-two full adders in a row,
    # each taking two input bits and a carry and producing a sum bit and a carry
    # out. Slower than the XOR loop, which stops as soon as no carries are left,
    # but it is where the XOR loop comes from.
    result = 0
    carry = 0

    for i in range(32):
        x = (a >> i) & 1
        y = (b >> i) & 1
        xor = x ^ y
        result |= (xor ^ carry) << i
        carry = (x & y) | (carry & xor)

    return result if result <= LARGEST else ~(result ^ MASK)
