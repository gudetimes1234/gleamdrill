def squares(nums)
  nums.to_h { |n| [n, n * n] }
end
