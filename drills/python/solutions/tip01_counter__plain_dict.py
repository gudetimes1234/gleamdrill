def topTwo(nums):
    # What Counter does underneath: a dict of counts, then a sort. Worth writing
    # once so most_common stops being a black box.
    counts = {}
    for num in nums:
        counts[num] = counts.get(num, 0) + 1
    ordered = sorted(counts.items(), key=lambda entry: entry[1], reverse=True)
    return ordered[:2]

def countOf(nums, value):
    return sum(1 for num in nums if num == value)
