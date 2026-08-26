def findMedianSortedArrays(nums1, nums2):
    # Always halve the shorter side, so the search is O(log min(m, n)).
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1

    m, n = len(nums1), len(nums2)
    total = m + n
    if total == 0:
        return 0.0
    half = (total + 1) // 2

    low, high = 0, m
    while low <= high:
        cut1 = (low + high) // 2
        cut2 = half - cut1

        left1 = nums1[cut1 - 1] if cut1 > 0 else float("-inf")
        right1 = nums1[cut1] if cut1 < m else float("inf")
        left2 = nums2[cut2 - 1] if cut2 > 0 else float("-inf")
        right2 = nums2[cut2] if cut2 < n else float("inf")

        # A correct cut is one where everything left of it is <= everything
        # right of it, across both arrays.
        if left1 <= right2 and left2 <= right1:
            if total % 2 == 1:
                return float(max(left1, left2))
            return (max(left1, left2) + min(right1, right2)) / 2
        if left1 > right2:
            high = cut1 - 1
        else:
            low = cut1 + 1

    return 0.0
