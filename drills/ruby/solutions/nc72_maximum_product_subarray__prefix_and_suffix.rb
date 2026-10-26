def max_product(nums)
  return 0 if nums.empty?

  # A different argument entirely: the best subarray always runs to one end of
  # the block it sits in, so sweeping running products from both directions,
  # resetting at every zero, is enough.
  [sweep(nums), sweep(nums.reverse)].max
end

def sweep(nums)
  running = 1
  best = -Float::INFINITY
  nums.each do |n|
    running = running.zero? ? n : running * n
    best = [best, running].max
  end
  best
end
