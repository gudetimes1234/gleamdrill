def productExceptSelf(nums):
    result = []
    for i in range(len(nums)):
        product = 1
        for j, num in enumerate(nums):
            if i != j:
                product *= num
        result.append(product)
    return result
