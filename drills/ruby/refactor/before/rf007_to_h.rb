def squares(nums)
  table = {}
  nums.each do |n|
    table[n] = n * n
  end
  table
end
