def longestConsecutive(nums):
    # No set: sort, then walk once counting runs. O(n log n) rather than O(n),
    # but it needs no extra structure and the run logic reads straight through.
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
