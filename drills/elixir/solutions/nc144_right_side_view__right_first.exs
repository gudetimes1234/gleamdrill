defmodule Solution do
  # Depth-first, visiting the right child first, and recording a value only when
  # its depth is met for the first time. No frontier at all: being first to
  # reach a depth is the same thing as being rightmost on it, given that order
  # of visiting.
  def right_side_view(tree) do
    seen = look(tree, 0, %{})

    0..(map_size(seen) - 1)//1
    |> Enum.map(&Map.fetch!(seen, &1))
  end

  defp look(nil, _depth, seen), do: seen

  defp look({value, left, right}, depth, seen) do
    seen = Map.put_new(seen, depth, value)
    look(left, depth + 1, look(right, depth + 1, seen))
  end
end
