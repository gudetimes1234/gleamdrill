def points(xs, ys)
  result = []
  i = 0
  while i < xs.length
    result << "(#{xs[i]}, #{ys[i]})"
    i += 1
  end
  result
end
