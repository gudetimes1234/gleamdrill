defmodule Solution do
  def partition(""), do: [[]]

  def partition(s) do
    chars = s |> String.graphemes() |> List.to_tuple()
    n = tuple_size(chars)

    # Work out which spans are palindromes once, up front, rather than
    # re-testing the same prefix on every branch of the search. The search is
    # then pure choice: a table lookup replaces a linear scan at every step.
    table =
      for span <- 0..(n - 1)//1, i <- 0..(n - 1)//1, i + span < n, reduce: %{} do
        acc ->
          j = i + span
          inside = if j - i < 2, do: true, else: Map.fetch!(acc, {i + 1, j - 1})
          Map.put(acc, {i, j}, elem(chars, i) == elem(chars, j) and inside)
      end

    build(s, 0, n, table)
  end

  defp build(_s, start, n, _table) when start >= n, do: [[]]

  defp build(s, start, n, table) do
    for finish <- start..(n - 1)//1,
        Map.fetch!(table, {start, finish}),
        rest <- build(s, finish + 1, n, table),
        do: [String.slice(s, start, finish - start + 1) | rest]
  end
end
