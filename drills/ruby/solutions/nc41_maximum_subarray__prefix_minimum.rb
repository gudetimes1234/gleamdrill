def max_sub_array(nums)
  return 0 if nums.empty?

  # The sum from i to j is prefix[j] - prefix[i-1], so the best subarray
  # ending at j is prefix[j] minus the smallest prefix before it. One pass
  # carrying that minimum answers the whole thing.
  running = 0
  smallest = 0
  best = -Float::INFINITY
  nums.each do |n|
    running += n
    best = [best, running - smallest].max
    smallest = [smallest, running].min
  end
  best
end
