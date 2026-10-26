def find_median_sorted_arrays(nums1, nums2)
  # Always halve the shorter side, so the search is O(log min(m, n)).
  nums1, nums2 = nums2, nums1 if nums1.length > nums2.length

  m = nums1.length
  n = nums2.length
  total = m + n
  return 0.0 if total.zero?

  half = (total + 1) / 2

  low = 0
  high = m
  while low <= high
    cut1 = (low + high) / 2
    cut2 = half - cut1

    left1 = cut1 > 0 ? nums1[cut1 - 1] : -Float::INFINITY
    right1 = cut1 < m ? nums1[cut1] : Float::INFINITY
    left2 = cut2 > 0 ? nums2[cut2 - 1] : -Float::INFINITY
    right2 = cut2 < n ? nums2[cut2] : Float::INFINITY

    # A correct cut is one where everything left of it is <= everything
    # right of it, across both arrays.
    if left1 <= right2 && left2 <= right1
      return [left1, left2].max.to_f if total.odd?

      return ([left1, left2].max + [right1, right2].min) / 2.0
    end

    if left1 > right2
      high = cut1 - 1
    else
      low = cut1 + 1
    end
  end

  0.0
end
