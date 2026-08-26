defmodule Solution do
  def min_distance(word1, word2) do
    a = word1 |> String.graphemes() |> List.to_tuple()
    b = word2 |> String.graphemes() |> List.to_tuple()
    {cost, _memo} = from(0, 0, tuple_size(a), tuple_size(b), a, b, %{})
    cost
  end

  # The same three edits as an explicit choice from the front. Running out of
  # one word costs whatever is left of the other, since every remaining
  # character has to be inserted or deleted.
  defp from(i, j, n, m, _a, _b, memo) when i >= n, do: {m - j, memo}
  defp from(i, j, n, m, _a, _b, memo) when j >= m, do: {n - i, memo}

  defp from(i, j, n, m, a, b, memo) do
    case Map.fetch(memo, {i, j}) do
      {:ok, cached} ->
        {cached, memo}

      :error ->
        if elem(a, i) == elem(b, j) do
          from(i + 1, j + 1, n, m, a, b, memo)
        else
          {replace, memo} = from(i + 1, j + 1, n, m, a, b, memo)
          {delete, memo} = from(i + 1, j, n, m, a, b, memo)
          {insert, memo} = from(i, j + 1, n, m, a, b, memo)
          best = 1 + min(replace, min(delete, insert))
          {best, Map.put(memo, {i, j}, best)}
        end
    end
  end
end
