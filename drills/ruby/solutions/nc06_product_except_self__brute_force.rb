def product_except_self(nums)
  nums.each_index.map do |i|
    nums.each_with_index.reduce(1) { |product, (num, j)| j == i ? product : product * num }
  end
end
