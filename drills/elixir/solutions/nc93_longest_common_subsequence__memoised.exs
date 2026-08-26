defmodule Solution do
  def longest_common_subsequence(text1, text2) do
    a = text1 |> String.graphemes() |> List.to_tuple()
    b = text2 |> String.graphemes() |> List.to_tuple()
    {answer, _memo} = from(0, 0, tuple_size(a), tuple_size(b), a, b, %{})
    answer
  end

  # The same recurrence from the front, with a cache. Written this way the
  # choice is explicit -- match and advance both, or give up one character from
  # one side -- which the rolling row hides behind its indices.
  defp from(i, j, n, m, _a, _b, memo) when i >= n or j >= m, do: {0, memo}

  defp from(i, j, n, m, a, b, memo) do
    case Map.fetch(memo, {i, j}) do
      {:ok, cached} ->
        {cached, memo}

      :error ->
        {best, memo} =
          if elem(a, i) == elem(b, j) do
            {rest, memo} = from(i + 1, j + 1, n, m, a, b, memo)
            {rest + 1, memo}
          else
            {drop_a, memo} = from(i + 1, j, n, m, a, b, memo)
            {drop_b, memo} = from(i, j + 1, n, m, a, b, memo)
            {max(drop_a, drop_b), memo}
          end

        {best, Map.put(memo, {i, j}, best)}
    end
  end
end
