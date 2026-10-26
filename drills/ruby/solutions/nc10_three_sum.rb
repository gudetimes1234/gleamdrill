def three_sum(nums)
  nums = nums.sort
  result = []

  nums.each_with_index do |a, i|
    next if i.positive? && a == nums[i - 1]

    left = i + 1
    right = nums.length - 1
    while left < right
      total = a + nums[left] + nums[right]
      if total.negative?
        left += 1
      elsif total.positive?
        right -= 1
      else
        result << [a, nums[left], nums[right]]
        left += 1
        left += 1 while left < right && nums[left] == nums[left - 1]
      end
    end
  end
  result
end
