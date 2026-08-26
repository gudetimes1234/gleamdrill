defmodule Solution do
  # Carry the largest value seen on the way down. A node is good when nothing
  # above it is bigger, so the check needs no knowledge of the tree below --
  # which is what makes one pass enough. The root is always good, and passing
  # its own value down as the initial maximum is what says so.
  def good_nodes(nil), do: 0
  def good_nodes({value, _left, _right} = tree), do: count(tree, value)

  defp count(nil, _largest), do: 0

  defp count({value, left, right}, largest) do
    here = if value >= largest, do: 1, else: 0
    below = max(largest, value)
    here + count(left, below) + count(right, below)
  end
end
