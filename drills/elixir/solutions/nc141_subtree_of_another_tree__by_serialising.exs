defmodule Solution do
  # Serialise both trees and ask whether one string contains the other. That
  # turns an O(n*m) tree comparison into substring search, which is linear with
  # the right algorithm. It is only sound because the serialisation marks the
  # empty children: without them "2" inside "12" would match, and so would a
  # subtree that starts the same way but is missing a child.
  def is_subtree(root, sub), do: String.contains?(serialise(root), serialise(sub))

  defp serialise(nil), do: "#"

  defp serialise({value, left, right}) do
    "(" <> Integer.to_string(value) <> serialise(left) <> serialise(right) <> ")"
  end
end
