defmodule Solution do
  # Prim's algorithm. Each outside point remembers only its distance to the tree
  # so far, so adding a point is one pass to find the nearest and one pass to
  # update -- O(n^2) total, which is what a complete graph costs anyway, and it
  # needs no heap. Cheapest-edge-first is safe because the cheapest edge leaving
  # any set of points is always in some minimum spanning tree.
  def min_cost_connect_points([]), do: 0

  def min_cost_connect_points([start | rest]) do
    rest
    |> Enum.with_index()
    |> Enum.map(fn {point, i} -> {i, point, distance(start, point)} end)
    |> grow(0)
  end

  defp grow([], total), do: total

  defp grow(outside, total) do
    {index, point, cost} = Enum.min_by(outside, fn {_i, _point, cost} -> cost end)

    outside
    |> Enum.reject(fn {i, _point, _cost} -> i == index end)
    |> Enum.map(fn {i, other, best} -> {i, other, min(best, distance(point, other))} end)
    |> grow(total + cost)
  end

  defp distance([ax, ay], [bx, by]), do: abs(ax - bx) + abs(ay - by)
end
