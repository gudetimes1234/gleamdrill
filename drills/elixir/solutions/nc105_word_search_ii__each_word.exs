defmodule Solution do
  def find_words([], _words), do: []
  def find_words([[] | _], _words), do: []

  # Word Search, once per word. Correct, and it redoes the search for every
  # shared prefix: a hundred words beginning "ab" each re-walk that "ab" from
  # every square. That repetition is exactly what the trie removes.
  def find_words(board, words) do
    grid =
      for {row, r} <- Enum.with_index(board),
          {value, c} <- Enum.with_index(row),
          into: %{},
          do: {{r, c}, value}

    Enum.filter(words, fn word ->
      case String.graphemes(word) do
        [] -> false
        letters -> Enum.any?(Map.keys(grid), &exists?(grid, &1, letters, MapSet.new()))
      end
    end)
  end

  defp exists?(_grid, _at, [], _used), do: true

  defp exists?(grid, at, [letter | rest], used) do
    cond do
      MapSet.member?(used, at) -> false
      Map.get(grid, at) != letter -> false
      rest == [] -> true
      true -> Enum.any?(neighbours(at), &exists?(grid, &1, rest, MapSet.put(used, at)))
    end
  end

  defp neighbours({r, c}), do: [{r - 1, c}, {r + 1, c}, {r, c - 1}, {r, c + 1}]
end
