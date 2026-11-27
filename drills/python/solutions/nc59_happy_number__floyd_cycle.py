def isHappy(n):
    # The same question with no memory at all: run one pointer at single speed
    # and another at double, and they meet inside whatever cycle exists. Meeting
    # at 1 means the cycle is the fixed point; meeting anywhere else means it is
    # not. Constant space, which is the whole reason to know it.
    slow = n  # @1
    fast = squareDigits(n)  # @2
    while slow != fast:  # @3
        slow = squareDigits(slow)  # @4
        fast = squareDigits(squareDigits(fast))  # @5
    return slow == 1  # @6


def squareDigits(n):
    total = 0  # @7
    while n:  # @8
        digit = n % 10  # @9
        total += digit * digit  # @10
        n //= 10  # @11
    return total  # @12
