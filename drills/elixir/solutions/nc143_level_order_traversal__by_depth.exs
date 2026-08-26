defmodule Solution do
  # Walk depth-first and file each value under its depth. The traversal order is
  # wrong for the answer, but appending to the right bucket puts it right -- and
  # within a level, left is still visited before right, which is all the
  # ordering the answer needs. One map instead of a frontier.
  def level_order(tree) do
    levels = collect(tree, 0, %{})

    0..(map_size(levels) - 1)//1
    |> Enum.map(fn depth -> Enum.reverse(Map.fetch!(levels, depth)) end)
  end

  defp collect(nil, _depth, levels), do: levels

  defp collect({value, left, right}, depth, levels) do
    levels = Map.update(levels, depth, [value], &[value | &1])
    collect(right, depth + 1, collect(left, depth + 1, levels))
  end
end
