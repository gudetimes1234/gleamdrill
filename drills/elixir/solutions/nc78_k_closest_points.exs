defmodule Solution do
  # Sorting by *squared* distance rather than distance: the square root is
  # monotonic, so it cannot change the order, and skipping it keeps everything
  # in integers with no rounding to argue about.
  def k_closest(points, k) do
    points
    |> Enum.sort_by(fn {x, y} -> x * x + y * y end)
    |> Enum.take(k)
  end
end
