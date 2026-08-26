def longestConsecutive(nums):
    if not nums:
        return 0

    ordered = sorted(nums)
    longest = 1
    run = 1

    for i in range(1, len(ordered)):
        step = ordered[i] - ordered[i - 1]
        if step == 0:
            continue  # duplicates neither extend nor break a run
        if step == 1:
            run += 1
            longest = max(longest, run)
        else:
            run = 1

    return longest
