def isHappy(n):
    # The same question with no memory at all: run one pointer at single speed
    # and another at double, and they meet inside whatever cycle exists. Meeting
    # at 1 means the cycle is the fixed point; meeting anywhere else means it is
    # not. Constant space, which is the whole reason to know it.
    slow = n
    fast = squareDigits(n)
    while slow != fast:
        slow = squareDigits(slow)
        fast = squareDigits(squareDigits(fast))
    return slow == 1


def squareDigits(n):
    total = 0
    while n:
        digit = n % 10
        total += digit * digit
        n //= 10
    return total
