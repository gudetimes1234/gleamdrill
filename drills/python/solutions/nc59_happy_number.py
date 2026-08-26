def isHappy(n):
    # The sequence has to repeat eventually -- squares of digits are bounded, so
    # there are only finitely many values it can reach. Remembering what has
    # been seen turns "does it loop?" into a set lookup.
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = squareDigits(n)
    return n == 1


def squareDigits(n):
    total = 0
    while n:
        digit = n % 10
        total += digit * digit
        n //= 10
    return total
