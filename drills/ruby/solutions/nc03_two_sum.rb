def two_sum(nums, target)
  seen = {}
  nums.each_with_index do |num, i|
    complement = target - num
    return [seen[complement], i] if seen.key?(complement)

    seen[num] = i
  end
  []
end
