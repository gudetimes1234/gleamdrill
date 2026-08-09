from collections import Counter

def topTwo(nums):
    return Counter(nums).most_common(2)

def countOf(nums, value):
    return Counter(nums)[value]
