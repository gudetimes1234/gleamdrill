def find_target_sum_ways(nums, target)
  # The state that matters is only the running total, not which signs produced
  # it, so carry a map from reachable total to how many ways reach it, and
  # widen it by each number twice, once added and once subtracted. Different
  # sign choices landing on the same total merge, which is what stops the
  # work being exponential.
  totals = { 0 => 1 }

  nums.each do |n|
    following = Hash.new(0)
    totals.each do |total, count|
      following[total + n] += count
      following[total - n] += count
    end
    totals = following
  end

  totals.fetch(target, 0)
end
