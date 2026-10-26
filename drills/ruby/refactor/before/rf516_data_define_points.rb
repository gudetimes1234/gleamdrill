def make_point(x, y)
  { x: x, y: y }
end

def distance(a, b)
  Math.sqrt((a[:x] - b[:x])**2 + (a[:y] - b[:y])**2)
end
