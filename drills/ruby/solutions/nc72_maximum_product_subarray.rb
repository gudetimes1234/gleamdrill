def max_product(nums)
  return 0 if nums.empty?

  # A negative number turns the best running product into the worst and the
  # worst into the best, so both have to be carried. Zero resets them both,
  # which falls out of taking the element itself as an option.
  high = low = best = nums[0]
  nums.drop(1).each do |n|
    candidates = [n, high * n, low * n]
    high, low = candidates.max, candidates.min
    best = [best, high].max
  end

  best
end
