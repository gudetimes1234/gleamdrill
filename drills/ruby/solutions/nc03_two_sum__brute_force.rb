def two_sum(nums, target)
  (0...nums.length).each do |i|
    (i + 1...nums.length).each do |j|
      return [i, j] if nums[i] + nums[j] == target
    end
  end
  []
end
