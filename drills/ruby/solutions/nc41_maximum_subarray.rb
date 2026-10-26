def max_sub_array(nums)
  return 0 if nums.empty?

  # Kadane: at each position the best subarray ending here either extends the
  # one ending just before it or starts fresh. A running total that has gone
  # negative can only hurt whatever follows, so it is dropped.
  here = best = nums[0]
  nums.drop(1).each do |n|
    here = [n, here + n].max
    best = [best, here].max
  end
  best
end
