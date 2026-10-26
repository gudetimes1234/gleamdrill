def max_area(height)
  best = 0
  (0...height.length).each do |left|
    (left + 1...height.length).each do |right|
      best = [best, (right - left) * [height[left], height[right]].min].max
    end
  end
  best
end
