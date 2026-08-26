def missingNumber(nums):
    # The numbers 0..n sum to n(n+1)/2 whatever order they arrive in, so the gap
    # between that and the actual total is the missing value. One multiplication
    # instead of a pass of XORs -- but in a fixed-width language it overflows on
    # inputs the XOR version handles fine, which is the trade worth knowing.
    n = len(nums)
    return n * (n + 1) // 2 - sum(nums)
