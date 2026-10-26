def max_area(height)
  left = 0
  right = height.length - 1
  best = 0

  while left < right
    area = (right - left) * [height[left], height[right]].min
    best = [best, area].max

    # The shorter wall caps the area: moving the taller one can only shrink it.
    if height[left] < height[right]
      left += 1
    else
      right -= 1
    end
  end
  best
end
