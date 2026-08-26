defmodule Solution do
  # The last value on each level, which is what "seen from the right" means once
  # the question is asked level by level. Walking down the right children alone
  # is the tempting wrong answer: where the right side is short, a node further
  # left is the one that shows.
  def right_side_view(nil), do: []
  def right_side_view(tree), do: descend([tree], [])

  defp descend([], seen), do: Enum.reverse(seen)

  defp descend(frontier, seen) do
    {rightmost, _left, _right} = List.last(frontier)

    frontier
    |> Enum.flat_map(fn {_value, left, right} -> Enum.reject([left, right], &is_nil/1) end)
    |> descend([rightmost | seen])
  end
end
