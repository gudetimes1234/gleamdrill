def findMedianSortedArrays(nums1, nums2):
    total = len(nums1) + len(nums2)
    if total == 0:
        return 0.0

    # Merge, but stop at the middle and keep only the last two values seen: the
    # merged array is never built, so this is O(m + n) time and no extra space.
    i = j = 0
    previous = current = 0
    for _ in range(total // 2 + 1):
        previous = current
        if i < len(nums1) and (j >= len(nums2) or nums1[i] <= nums2[j]):
            current = nums1[i]
            i += 1
        else:
            current = nums2[j]
            j += 1

    if total % 2 == 1:
        return float(current)
    return (previous + current) / 2
