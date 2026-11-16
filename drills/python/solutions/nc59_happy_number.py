def isHappy(n):
    # The sequence has to repeat eventually -- squares of digits are bounded, so
    # there are only finitely many values it can reach. Remembering what has
    # been seen turns "does it loop?" into a set lookup.
    seen = set()  # @1
    while n != 1 and n not in seen:  # @2
        seen.add(n)  # @3
        n = squareDigits(n)  # @4
    return n == 1  # @5


def squareDigits(n):
    total = 0  # @6
    while n:  # @7
        digit = n % 10  # @8
        total += digit * digit  # @9
        n //= 10  # @10
    return total  # @11
