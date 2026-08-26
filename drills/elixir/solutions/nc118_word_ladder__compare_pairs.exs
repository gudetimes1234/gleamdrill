defmodule Solution do
  def ladder_length(begin_word, end_word, word_list) do
    words = MapSet.new(word_list)

    if not MapSet.member?(words, end_word) do
      0
    else
      search([begin_word], MapSet.new([begin_word]), words, end_word, 1)
    end
  end

  # Neighbours found by comparing against every remaining word. Simpler to state
  # and O(n) comparisons per expansion rather than a constant number of lookups
  # -- which is the cost the wildcard buckets remove.
  defp search([], _seen, _words, _end_word, _steps), do: 0

  defp search(frontier, seen, words, end_word, steps) do
    if end_word in frontier do
      steps
    else
      next =
        Enum.filter(words, fn candidate ->
          not MapSet.member?(seen, candidate) and
            Enum.any?(frontier, &differs_by_one?(&1, candidate))
        end)

      search(next, Enum.reduce(next, seen, &MapSet.put(&2, &1)), words, end_word, steps + 1)
    end
  end

  defp differs_by_one?(a, b) do
    a = String.graphemes(a)
    b = String.graphemes(b)

    length(a) == length(b) and
      Enum.count(Enum.zip(a, b), fn {x, y} -> x != y end) == 1
  end
end
