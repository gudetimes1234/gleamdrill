def find_min(nums)
  (1...nums.length).each do |i|
    return nums[i] if nums[i] < nums[i - 1]
  end
  nums[0]
end
