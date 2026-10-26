def three_sum(nums)
  nums.combination(3).select { |triple| triple.sum.zero? }.map(&:sort).uniq.sort
end
