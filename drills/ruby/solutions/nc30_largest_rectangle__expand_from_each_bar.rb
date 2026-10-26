def largest_rectangle_area(heights)
  best = 0

  heights.each_with_index do |h, i|
    # How far this bar's own height can spread in each direction. O(n^2),
    # and the definition of the answer: every rectangle is some bar taken
    # as far as it will go.
    left = i
    left -= 1 while left.positive? && heights[left - 1] >= h
    right = i
    right += 1 while right + 1 < heights.length && heights[right + 1] >= h
    best = [best, h * (right - left + 1)].max
  end
  best
end
