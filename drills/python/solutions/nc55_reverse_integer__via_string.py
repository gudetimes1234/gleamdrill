LARGEST = 2147483647
SMALLEST = -2147483648


def reverse(x):
    # Reversing the text cannot overflow here, so the range check is a plain
    # comparison at the end rather than a guard inside the loop -- which is only
    # safe because the value is not held in 32 bits along the way.
    magnitude = int(str(abs(x))[::-1])
    result = -magnitude if x < 0 else magnitude
    return 0 if result > LARGEST or result < SMALLEST else result
