def k_closest(points, k)
  # Pull the nearest of what is left out k times rather than ordering
  # everything: O(n·k) against a full sort's O(n log n), so it wins exactly
  # when k is small, the same argument that makes a bounded heap of size k
  # the textbook answer here.
  remaining = points.dup
  closest = []
  k.times do
    break if remaining.empty?

    nearest = remaining.each_index.min_by { |i| remaining[i][0]**2 + remaining[i][1]**2 }
    closest << remaining.delete_at(nearest)
  end
  closest
end
