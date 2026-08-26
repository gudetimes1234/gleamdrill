def singleNumber(nums):
    # Twice the sum of the distinct values counts every pair twice and the lone
    # value twice; subtracting the real total leaves the lone value. No bit
    # tricks, but it leans harder on the promise that everything else is a pair.
    return 2 * sum(set(nums)) - sum(nums)
