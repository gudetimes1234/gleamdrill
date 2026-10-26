def trap(height)
  total = 0
  height.each_index do |i|
    left_max = height[0..i].max
    right_max = height[i..].max
    total += [left_max, right_max].min - height[i]
  end
  total
end
