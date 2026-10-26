def k_closest(points, k)
  # Sorting by *squared* distance rather than distance: the square root is
  # monotonic, so it cannot change the order, and skipping it keeps everything
  # in integers with no rounding to argue about.
  points.sort_by { |x, y| x * x + y * y }.first(k)
end
