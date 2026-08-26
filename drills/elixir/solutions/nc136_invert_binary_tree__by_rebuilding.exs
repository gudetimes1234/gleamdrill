defmodule Solution do
  # Write the tree out pre-order with a marker for every empty child, then read
  # it back taking the first subtree as the *right* child. The inversion happens
  # entirely in the reading -- nothing is ever swapped. Longer than the direct
  # recursion, and worth having because the same flatten/rebuild pair is all
  # Serialize and Deserialize is.
  def invert_tree(tree) do
    {inverted, _rest} = rebuild(flatten(tree))
    inverted
  end

  defp flatten(nil), do: [:empty]
  defp flatten({value, left, right}), do: [value | flatten(left) ++ flatten(right)]

  defp rebuild([:empty | rest]), do: {nil, rest}
  defp rebuild([]), do: {nil, []}

  defp rebuild([value | rest]) do
    {first, after_first} = rebuild(rest)
    {second, after_second} = rebuild(after_first)
    {{value, second, first}, after_second}
  end
end
