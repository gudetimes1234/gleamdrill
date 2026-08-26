defmodule Solution do
  # Carry the whole path instead of just its maximum, and take the maximum at
  # each node. The same answer for O(depth) memory per node rather than one
  # integer -- the version worth writing once, because it makes plain that the
  # running maximum is a fold of the path, not a separate idea.
  def good_nodes(tree), do: count(tree, [])

  defp count(nil, _above), do: 0

  defp count({value, left, right}, above) do
    here = if Enum.all?(above, &(&1 <= value)), do: 1, else: 0
    below = [value | above]
    here + count(left, below) + count(right, below)
  end
end
