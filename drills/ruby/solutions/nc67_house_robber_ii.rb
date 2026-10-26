def rob(nums)
  # The circle only matters through one constraint: the first and last houses
  # are neighbours, so at most one of them is robbed. Ruling each out in turn
  # leaves two ordinary straight-line problems, and the answer is the better.
  return 0 if nums.empty?
  return nums[0] if nums.length == 1

  [straight(nums[1..]), straight(nums[...-1])].max
end

def straight(nums)
  best = 0
  previous = 0
  nums.each do |value|
    best, previous = [best, previous + value].max, best
  end
  best
end
