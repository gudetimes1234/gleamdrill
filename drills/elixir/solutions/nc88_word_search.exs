defmodule Solution do
  def exist(_board, ""), do: true
  def exist([], _word), do: false

  def exist(board, word) do
    grid =
      for {row, r} <- Enum.with_index(board),
          {value, c} <- Enum.with_index(row),
          into: %{},
          do: {{r, c}, value}

    letters = String.graphemes(word)
    Enum.any?(Map.keys(grid), &walk(grid, &1, letters, MapSet.new()))
  end

  # Depth-first from every starting square, with the path so far held in a set
  # so a letter is never reused within one attempt. The set is per-path rather
  # than global -- a square rejected on one route must still be available on
  # another, which is the difference between backtracking and plain search.
  defp walk(_grid, _at, [], _used), do: true

  defp walk(grid, at, [letter | rest], used) do
    cond do
      MapSet.member?(used, at) -> false
      Map.get(grid, at) != letter -> false
      rest == [] -> true
      true -> Enum.any?(neighbours(at), &walk(grid, &1, rest, MapSet.put(used, at)))
    end
  end

  defp neighbours({r, c}), do: [{r - 1, c}, {r + 1, c}, {r, c - 1}, {r, c + 1}]
end
