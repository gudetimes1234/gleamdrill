def find_median_sorted_arrays(nums1, nums2)
  merged = (nums1 + nums2).sort
  return 0.0 if merged.empty?

  # One expression for both parities: for an odd length the two indices are
  # the same element, so the average of it with itself is itself.
  (merged[merged.length / 2] + merged[(merged.length - 1) / 2]) / 2.0
end
