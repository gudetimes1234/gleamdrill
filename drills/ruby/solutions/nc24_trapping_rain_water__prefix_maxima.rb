def trap(height)
  left = []
  best = 0
  height.each do |h|
    best = [best, h].max
    left << best
  end

  right = Array.new(height.length, 0)
  best = 0
  (height.length - 1).downto(0) do |i|
    best = [best, height[i]].max
    right[i] = best
  end

  height.each_index.sum { |i| [left[i], right[i]].min - height[i] }
end
