defmodule Solution do
  def ladder_length(begin_word, end_word, word_list) do
    words = MapSet.new(word_list)

    if not MapSet.member?(words, end_word) do
      0
    else
      # The graph is never built: "hot" and "dot" are neighbours because they
      # share the pattern "*ot", so bucketing every word under each of its
      # wildcard patterns gives the adjacency for free. Comparing every pair
      # instead costs O(n^2) comparisons before the search even starts.
      buckets =
        Enum.reduce(words, %{}, fn word, acc ->
          Enum.reduce(patterns(word), acc, fn pattern, acc ->
            Map.update(acc, pattern, [word], &[word | &1])
          end)
        end)

      search([begin_word], MapSet.new([begin_word]), buckets, end_word, 1)
    end
  end

  defp patterns(word) do
    letters = String.graphemes(word)

    for i <- 0..(length(letters) - 1)//1 do
      letters |> List.replace_at(i, "*") |> Enum.join()
    end
  end

  defp search([], _seen, _buckets, _end_word, _steps), do: 0

  defp search(frontier, seen, buckets, end_word, steps) do
    if end_word in frontier do
      steps
    else
      {next, seen} =
        Enum.reduce(frontier, {[], seen}, fn word, acc ->
          word
          |> patterns()
          |> Enum.flat_map(&Map.get(buckets, &1, []))
          |> Enum.reduce(acc, fn neighbour, {next, seen} ->
            if MapSet.member?(seen, neighbour),
              do: {next, seen},
              else: {[neighbour | next], MapSet.put(seen, neighbour)}
          end)
        end)

      search(next, seen, buckets, end_word, steps + 1)
    end
  end
end
