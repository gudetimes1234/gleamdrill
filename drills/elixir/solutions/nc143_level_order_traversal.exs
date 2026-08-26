defmodule Solution do
  # Take the whole frontier at once rather than one node at a time: everything
  # on it is the current level, and its children are the next. That is what
  # makes the grouping fall out without tracking any depth -- a plain queue
  # would give the right order but no idea where each level ends.
  def level_order(nil), do: []
  def level_order(tree), do: descend([tree], [])

  defp descend([], levels), do: Enum.reverse(levels)

  defp descend(frontier, levels) do
    values = Enum.map(frontier, fn {value, _left, _right} -> value end)

    frontier
    |> Enum.flat_map(fn {_value, left, right} -> Enum.reject([left, right], &is_nil/1) end)
    |> descend([values | levels])
  end
end
