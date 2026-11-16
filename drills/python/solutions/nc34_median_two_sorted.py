def findMedianSortedArrays(nums1, nums2):
    total = len(nums1) + len(nums2)  # @1
    if total == 0:  # @2
        return 0.0  # @2

    # Merge, but stop at the middle and keep only the last two values seen: the
    # merged array is never built, so this is O(m + n) time and no extra space.
    i = j = 0  # @3
    previous = current = 0  # @4
    for _ in range(total // 2 + 1):  # @5
        previous = current  # @6
        if i < len(nums1) and (j >= len(nums2) or nums1[i] <= nums2[j]):  # @7
            current = nums1[i]  # @8
            i += 1  # @8
        else:  # @9
            current = nums2[j]  # @9
            j += 1  # @9

    if total % 2 == 1:  # @10
        return float(current)  # @10
    return (previous + current) / 2  # @11
