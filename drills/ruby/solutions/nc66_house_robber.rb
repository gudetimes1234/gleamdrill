def rob(nums)
  # At each house the choice is take it and add what was safe two houses back,
  # or skip it and keep the best so far. Both answers are one number, so the
  # whole table collapses to a pair.
  best = 0
  previous = 0
  nums.each do |value|
    best, previous = [best, previous + value].max, best
  end
  best
end
