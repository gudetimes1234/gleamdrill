def max_sliding_window(nums, k)
  return [] if k <= 0 || nums.length < k

  nums.each_cons(k).map(&:max)
end
