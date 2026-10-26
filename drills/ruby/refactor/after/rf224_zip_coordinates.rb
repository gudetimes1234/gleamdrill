def points(xs, ys)
  xs.zip(ys).map { |x, y| "(#{x}, #{y})" }
end
