Point = Data.define(:x, :y)

def make_point(x, y)
  Point.new(x: x, y: y)
end

def distance(a, b)
  Math.hypot(a.x - b.x, a.y - b.y)
end
