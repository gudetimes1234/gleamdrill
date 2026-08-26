defmodule Solution do
  # Pre-order with a marker for every empty child. Recording the empties is what
  # makes the format unambiguous -- a pre-order list of values alone matches
  # many different trees -- and it is also what lets the reader work without any
  # length information: it stops as soon as it has consumed a whole subtree.
  def serialize(tree), do: tree |> tokens() |> Enum.join(",")

  def deserialize(text) do
    {tree, _rest} = rebuild(String.split(text, ","))
    tree
  end

  defp tokens(nil), do: ["#"]

  defp tokens({value, left, right}) do
    [Integer.to_string(value) | tokens(left) ++ tokens(right)]
  end

  defp rebuild([]), do: {nil, []}
  defp rebuild(["#" | rest]), do: {nil, rest}

  defp rebuild([head | rest]) do
    {left, after_left} = rebuild(rest)
    {right, after_right} = rebuild(after_left)
    {{String.to_integer(head), left, right}, after_right}
  end
end
