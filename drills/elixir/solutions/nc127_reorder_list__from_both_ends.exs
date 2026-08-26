defmodule Solution do
  # Take from the front, then from the back, until they meet. Reads exactly like
  # the specification and needs no midpoint and no reversal -- but each "take
  # from the back" is a full walk of what is left, so it is O(n^2) where the
  # split-and-reverse version is O(n).
  def reorder_list(values), do: take_ends(values, [])

  defp take_ends([], out), do: Enum.reverse(out)
  defp take_ends([only], out), do: Enum.reverse([only | out])

  defp take_ends([first | rest], out) do
    {middle, [last]} = Enum.split(rest, length(rest) - 1)
    take_ends(middle, [last, first | out])
  end
end
