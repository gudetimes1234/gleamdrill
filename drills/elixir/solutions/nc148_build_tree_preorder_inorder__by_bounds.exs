defmodule Solution do
  # The same construction without slicing anything: a map from value to its
  # in-order position, plus a low and a high bound saying which slice each call
  # owns. Building the map once turns the repeated search for the root -- the
  # hidden O(n) inside the slicing version -- into a lookup.
  def build_tree(preorder, inorder) do
    places = inorder |> Enum.with_index() |> Map.new()
    {tree, _rest} = take(preorder, places, 0, length(inorder) - 1)
    tree
  end

  defp take(preorder, _places, low, high) when low > high, do: {nil, preorder}
  defp take([], _places, _low, _high), do: {nil, []}

  defp take([root | rest], places, low, high) do
    split = Map.get(places, root, low)
    {left, after_left} = take(rest, places, low, split - 1)
    {right, after_right} = take(after_left, places, split + 1, high)
    {{root, left, right}, after_right}
  end
end
