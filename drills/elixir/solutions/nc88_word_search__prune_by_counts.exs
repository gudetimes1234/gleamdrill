defmodule Solution do
  def exist(_board, ""), do: true
  def exist([], _word), do: false

  def exist(board, word) do
    grid =
      for {row, r} <- Enum.with_index(board),
          {value, c} <- Enum.with_index(row),
          into: %{},
          do: {{r, c}, value}

    available = board |> List.flatten() |> Enum.frequencies()
    needed = word |> String.graphemes() |> Enum.frequencies()

    # Two cheap checks before any searching. If the board does not hold enough
    # copies of some letter, no search can succeed. And searching from whichever
    # end of the word is rarer on the board starts from fewer squares -- the
    # branching factor at the root is what dominates.
    cond do
      Enum.any?(needed, fn {letter, count} -> Map.get(available, letter, 0) < count end) ->
        false

      true ->
        letters = String.graphemes(word)
        first = hd(letters)
        last = List.last(letters)

        ordered =
          if Map.get(available, first, 0) > Map.get(available, last, 0),
            do: Enum.reverse(letters),
            else: letters

        Enum.any?(Map.keys(grid), &walk(grid, &1, ordered, MapSet.new()))
    end
  end

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
