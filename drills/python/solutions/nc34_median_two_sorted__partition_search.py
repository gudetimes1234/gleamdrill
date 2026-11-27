def findMedianSortedArrays(nums1, nums2):
    # Always halve the shorter side, so the search is O(log min(m, n)).
    if len(nums1) > len(nums2):  # @1
        nums1, nums2 = nums2, nums1  # @1

    m, n = len(nums1), len(nums2)  # @2
    total = m + n  # @2
    if total == 0:  # @3
        return 0.0  # @3
    half = (total + 1) // 2  # @4

    low, high = 0, m  # @5
    while low <= high:  # @6
        cut1 = (low + high) // 2  # @7
        cut2 = half - cut1  # @8

        left1 = nums1[cut1 - 1] if cut1 > 0 else float("-inf")  # @9
        right1 = nums1[cut1] if cut1 < m else float("inf")  # @9
        left2 = nums2[cut2 - 1] if cut2 > 0 else float("-inf")  # @10
        right2 = nums2[cut2] if cut2 < n else float("inf")  # @10

        # A correct cut is one where everything left of it is <= everything
        # right of it, across both arrays.
        if left1 <= right2 and left2 <= right1:  # @11
            if total % 2 == 1:  # @12
                return float(max(left1, left2))  # @12
            return (max(left1, left2) + min(right1, right2)) / 2  # @13
        if left1 > right2:  # @14
            high = cut1 - 1  # @14
        else:  # @15
            low = cut1 + 1  # @15

    return 0.0  # @16
