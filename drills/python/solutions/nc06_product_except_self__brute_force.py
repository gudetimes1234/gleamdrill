def productExceptSelf(nums):
    # The obvious O(n^2) reading of the problem: for each slot, multiply
    # everything that is not in it. Worth knowing as the thing prefix/suffix
    # beats.
    result = []
    for i in range(len(nums)):
        product = 1
        for j, num in enumerate(nums):
            if i != j:
                product *= num
        result.append(product)
    return result
