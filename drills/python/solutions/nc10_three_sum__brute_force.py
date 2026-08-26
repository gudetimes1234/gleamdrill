def threeSum(nums):
    ordered = sorted(nums)
    result = []

    for i in range(len(ordered)):
        for j in range(i + 1, len(ordered)):
            for k in range(j + 1, len(ordered)):
                triple = [ordered[i], ordered[j], ordered[k]]
                if sum(triple) == 0 and triple not in result:
                    result.append(triple)

    return result
