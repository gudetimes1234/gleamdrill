defmodule Solution do
  # Count the levels instead of measuring the branches: take the whole frontier,
  # replace it with all its children, and add one. No recursion down the tree
  # and no stack -- which is what makes this the version that survives a tree
  # deep enough to overflow one.
  def max_depth(nil), do: 0
  def max_depth(tree), do: descend([tree], 0)

  defp descend([], depth), do: depth

  defp descend(frontier, depth) do
    frontier
    |> Enum.flat_map(fn {_value, left, right} -> Enum.reject([left, right], &is_nil/1) end)
    |> descend(depth + 1)
  end
end
