def findMedianSortedArrays(nums1, nums2):
    merged = sorted(nums1 + nums2)
    if not merged:
        return 0.0
    # One expression for both parities: for an odd length the two indices are
    # the same element, so the average of it with itself is itself.
    return (merged[len(merged) // 2] + merged[(len(merged) - 1) // 2]) / 2
