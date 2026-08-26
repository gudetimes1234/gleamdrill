defmodule Solution do
  # Two different quantities, which is the whole trick. What a node *returns* is
  # the best path that can continue upwards -- so at most one of its children.
  # What it *records* is the best path through it, which may use both. A
  # negative branch is dropped rather than added, because a path is allowed to
  # stop.
  def max_path_sum(nil), do: 0

  def max_path_sum(tree) do
    {_upwards, best} = walk(tree)
    best
  end

  defp walk(nil), do: {0, -1_000_000_000}

  defp walk({value, left, right}) do
    {left_up, left_best} = walk(left)
    {right_up, right_best} = walk(right)
    left_gain = max(left_up, 0)
    right_gain = max(right_up, 0)

    {value + max(left_gain, right_gain),
     Enum.max([value + left_gain + right_gain, left_best, right_best])}
  end
end
