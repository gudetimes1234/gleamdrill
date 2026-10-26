def contains_duplicate(nums)
  nums.sort.each_cons(2).any? { |a, b| a == b }
end
