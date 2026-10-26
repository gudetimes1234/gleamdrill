def product_except_self(nums)
  result = Array.new(nums.length, 1)

  prefix = 1
  nums.each_index do |i|
    result[i] = prefix
    prefix *= nums[i]
  end

  suffix = 1
  (nums.length - 1).downto(0) do |i|
    result[i] *= suffix
    suffix *= nums[i]
  end
  result
end
