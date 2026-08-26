defmodule Solution do
  # A binary search tree is exactly a tree whose in-order walk is strictly
  # increasing -- that is the definition, restated so that no bounds have to be
  # threaded anywhere. The cost is the list: O(n) memory against the range
  # check's O(depth).
  def is_valid_bst(tree) do
    values = in_order(tree, [])
    values |> Enum.zip(Enum.drop(values, 1)) |> Enum.all?(fn {a, b} -> a < b end)
  end

  defp in_order(nil, after_it), do: after_it

  defp in_order({value, left, right}, after_it) do
    in_order(left, [value | in_order(right, after_it)])
  end
end
