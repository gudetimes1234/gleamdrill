defmodule Solution do
  # Ask every node how tall its two sides are and keep the largest sum. Correct
  # and obvious, but height is recomputed from scratch at every node, so a
  # balanced tree costs O(n log n) and a spindly one O(n^2) -- which is exactly
  # what returning the height alongside the answer avoids.
  def diameter_of_binary_tree(nil), do: 0

  def diameter_of_binary_tree({_value, left, right}) do
    Enum.max([
      height(left) + height(right),
      diameter_of_binary_tree(left),
      diameter_of_binary_tree(right)
    ])
  end

  defp height(nil), do: 0
  defp height({_value, left, right}), do: 1 + max(height(left), height(right))
end
