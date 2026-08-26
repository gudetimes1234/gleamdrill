defmodule Solution do
  # Turn each tree into a string and compare those. It works only because the
  # serialisation records the empty children too: without a marker for them,
  # different trees flatten to the same sequence -- the same trap Serialize and
  # Deserialize turns on.
  def is_same_tree(first, second), do: serialise(first) == serialise(second)

  defp serialise(nil), do: "#"

  defp serialise({value, left, right}) do
    "(" <> Integer.to_string(value) <> serialise(left) <> serialise(right) <> ")"
  end
end
