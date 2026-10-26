def max_sliding_window(nums, k)
  return [] if k <= 0

  # Indices whose values could still be the maximum, values decreasing.
  # Ruby's Array is a fine deque: shift and pop are both amortised O(1).
  window = []
  out = []

  nums.each_with_index do |num, i|
    window.pop while !window.empty? && nums[window.last] <= num
    window << i
    window.shift if window.first <= i - k
    out << nums[window.first] if i >= k - 1
  end
  out
end
