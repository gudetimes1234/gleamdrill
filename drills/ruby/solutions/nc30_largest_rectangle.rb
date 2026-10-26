def largest_rectangle_area(heights)
  stack = [] # [start index, height] pairs
  best = 0

  heights.each_with_index do |h, i|
    start = i
    # Anything taller than the new bar can never extend past it, so its
    # rectangle is finished here. Whatever it reached back to becomes this
    # bar's own starting point.
    while !stack.empty? && stack.last[1] > h
      from_index, tall = stack.pop
      best = [best, tall * (i - from_index)].max
      start = from_index
    end
    stack << [start, h]
  end

  # Whatever survives was never cut off, so it runs to the far end.
  stack.each do |from_index, tall|
    best = [best, tall * (heights.length - from_index)].max
  end
  best
end
