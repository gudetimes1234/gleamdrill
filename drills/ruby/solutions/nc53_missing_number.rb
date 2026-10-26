def missing_number(nums)
  # XOR every value against every index it should have had. Each present
  # number meets its own index and cancels; the missing one has an index with
  # no partner, so that index is what survives.
  result = nums.length
  nums.each_with_index do |n, i|
    result ^= i ^ n
  end
  result
end
