def min_cost_connect_points(points)
  return 0 if points.empty?

  # Prim's algorithm. Each outside point remembers only its distance to the
  # tree so far, so adding a point is one pass to find the nearest and one
  # pass to update: O(n^2) total, which is what a complete graph costs
  # anyway, and it needs no heap. Cheapest-edge-first is safe because the
  # cheapest edge leaving any set of points is always in some minimum
  # spanning tree.
  start = points[0]
  outside = points[1..].map { |point| [point, distance(start, point)] }
  total = 0

  until outside.empty?
    best = (0...outside.length).min_by { |i| outside[i][1] }
    point, cost = outside.delete_at(best)
    total += cost
    outside.each { |entry| entry[1] = [entry[1], distance(point, entry[0])].min }
  end

  total
end

def distance(a, b)
  (a[0] - b[0]).abs + (a[1] - b[1]).abs
end
