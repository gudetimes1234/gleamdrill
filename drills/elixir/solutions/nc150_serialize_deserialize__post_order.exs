defmodule Solution do
  # Post-order instead of pre-order, still with a marker for every empty child.
  # The root is then the *last* token rather than the first, so the reader works
  # backwards -- and reading backwards means taking the right subtree before the
  # left. Worth writing once: the format is what decides the parse direction,
  # and nothing else about the two versions differs.
  def serialize(tree), do: tree |> tokens() |> Enum.join(",")

  def deserialize(text) do
    {tree, _rest} = text |> String.split(",") |> Enum.reverse() |> rebuild()
    tree
  end

  defp tokens(nil), do: ["#"]

  defp tokens({value, left, right}) do
    tokens(left) ++ tokens(right) ++ [Integer.to_string(value)]
  end

  defp rebuild([]), do: {nil, []}
  defp rebuild(["#" | rest]), do: {nil, rest}

  defp rebuild([head | rest]) do
    {right, after_right} = rebuild(rest)
    {left, after_left} = rebuild(after_right)
    {{String.to_integer(head), left, right}, after_left}
  end
end
