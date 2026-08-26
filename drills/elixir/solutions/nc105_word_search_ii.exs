defmodule Solution do
  def find_words([], _words), do: []
  def find_words([[] | _], _words), do: []

  # One trie of all the words, walked *alongside* the board. Searching for each
  # word separately re-walks every shared prefix once per word; the trie walks
  # each prefix once and abandons a square the moment no word continues that
  # way, which is where nearly all the saving is.
  def find_words(board, words) do
    grid =
      for {row, r} <- Enum.with_index(board),
          {value, c} <- Enum.with_index(row),
          into: %{},
          do: {{r, c}, value}

    trie = Enum.reduce(words, %{}, &insert(&2, String.graphemes(&1), &1))

    grid
    |> Map.keys()
    |> Enum.reduce(MapSet.new(), fn at, found ->
      walk(grid, at, trie, MapSet.new(), found)
    end)
    |> MapSet.to_list()
  end

  defp insert(node, [], word), do: Map.put(node, :word, word)

  defp insert(node, [first | rest], word) do
    Map.put(node, first, insert(Map.get(node, first, %{}), rest, word))
  end

  defp walk(grid, at, node, used, found) do
    letter = Map.get(grid, at)

    cond do
      MapSet.member?(used, at) or letter == nil ->
        found

      not Map.has_key?(node, letter) ->
        found

      true ->
        child = Map.fetch!(node, letter)
        found = if Map.has_key?(child, :word), do: MapSet.put(found, child.word), else: found
        used = MapSet.put(used, at)
        Enum.reduce(neighbours(at), found, &walk(grid, &1, child, used, &2))
    end
  end

  defp neighbours({r, c}), do: [{r - 1, c}, {r + 1, c}, {r, c - 1}, {r, c + 1}]
end
