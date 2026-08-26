LARGEST = 2147483647
SMALLEST = -2147483648


def reverse(x):
    # Peel a digit off the bottom of the input and push it onto the bottom of
    # the result. The overflow test has to happen *before* the multiply, because
    # in a fixed-width language the multiply is where the value would be lost.
    sign = -1 if x < 0 else 1
    remaining = abs(x)
    result = 0

    while remaining:
        if result > LARGEST // 10:
            return 0
        result = result * 10 + remaining % 10
        remaining //= 10

    result *= sign
    return 0 if result > LARGEST or result < SMALLEST else result
