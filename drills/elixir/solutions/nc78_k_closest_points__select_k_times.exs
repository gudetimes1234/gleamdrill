defmodule Solution do
  # Pull the nearest point out k times rather than ordering everything. O(n*k)
  # against a full sort's O(n log n), so it wins exactly when k is small --
  # which is the same reason a bounded heap beats a sort on this problem.
  def k_closest(points, k), do: take(points, k, [])

  defp take(_points, remaining, taken) when remaining <= 0, do: Enum.reverse(taken)
  defp take([], _remaining, taken), do: Enum.reverse(taken)

  defp take(points, remaining, taken) do
    nearest = Enum.min_by(points, fn {x, y} -> x * x + y * y end)
    take(List.delete(points, nearest), remaining - 1, [nearest | taken])
  end
end
