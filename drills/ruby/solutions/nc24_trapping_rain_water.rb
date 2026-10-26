def trap(height)
  left = 0
  right = height.length - 1
  left_max = right_max = total = 0

  while left < right
    # The lower end is the bound: the other side already has a wall at least
    # this tall, so the water here depends only on this side's maximum.
    if height[left] < height[right]
      left_max = [left_max, height[left]].max
      total += left_max - height[left]
      left += 1
    else
      right_max = [right_max, height[right]].max
      total += right_max - height[right]
      right -= 1
    end
  end
  total
end
