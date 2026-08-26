def plusOne(digits):
    # Fold the digits into a number, add one, take it apart again. Shorter, and
    # in Python it is even safe -- integers are arbitrary precision. In a
    # language where they are not, this is exactly the version that breaks, and
    # handing you digits rather than a number is the problem saying so.
    value = 0
    for digit in digits:
        value = value * 10 + digit
    return [int(c) for c in str(value + 1)]
