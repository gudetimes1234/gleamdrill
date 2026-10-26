def find_median_sorted_arrays(nums1, nums2)
  total = nums1.length + nums2.length
  return 0.0 if total.zero?

  # Merge, but stop at the middle and keep only the last two values seen: the
  # merged array is never built, so this is O(m + n) time and no extra space.
  i = 0
  j = 0
  previous = 0
  current = 0
  (total / 2 + 1).times do
    previous = current
    if i < nums1.length && (j >= nums2.length || nums1[i] <= nums2[j])
      current = nums1[i]
      i += 1
    else
      current = nums2[j]
      j += 1
    end
  end

  return current.to_f if total.odd?

  (previous + current) / 2.0
end
