def myPow(x, n):
    if n < 0:  # @1
        return 1 / power(x, -n)  # @1
    return power(x, n)  # @2


# Halving the exponent halves the work: x^n is (x^(n/2))^2, with one extra
# multiplication when n is odd. O(log n) multiplications rather than n.
def power(x, n):
    if n == 0:  # @3
        return 1.0  # @3
    half = power(x, n // 2)  # @4
    return half * half * x if n % 2 else half * half  # @5
