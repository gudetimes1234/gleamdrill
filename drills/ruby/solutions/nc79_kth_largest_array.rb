def find_kth_largest(nums, k)
  # Sorting answers every k at once, which is more than asked for but is the
  # version nobody gets wrong. O(n log n).
  return nil if k < 1 || k > nums.length

  nums.sort.reverse[k - 1]
end
