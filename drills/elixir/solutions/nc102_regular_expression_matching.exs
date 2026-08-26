defmodule Solution do
  def is_match(s, p) do
    text = s |> String.graphemes() |> List.to_tuple()
    pattern = p |> String.graphemes() |> List.to_tuple()
    {answer, _memo} = from(0, 0, tuple_size(text), tuple_size(pattern), text, pattern, %{})
    answer
  end

  # A star binds to the character *before* it, so the pattern has to be read two
  # symbols at a time. Given "x*", either skip the pair entirely -- zero copies
  # -- or, if x matches here, consume one character of the text and stay on the
  # same pair. Everything else is a single-character match.
  defp from(i, j, n, m, _text, _pattern, memo) when j >= m, do: {i >= n, memo}

  defp from(i, j, n, m, text, pattern, memo) do
    case Map.fetch(memo, {i, j}) do
      {:ok, cached} ->
        {cached, memo}

      :error ->
        here = i < n and (elem(pattern, j) == elem(text, i) or elem(pattern, j) == ".")

        {answer, memo} =
          if j + 1 < m and elem(pattern, j + 1) == "*" do
            {skipping, memo} = from(i, j + 2, n, m, text, pattern, memo)

            cond do
              skipping -> {true, memo}
              here -> from(i + 1, j, n, m, text, pattern, memo)
              true -> {false, memo}
            end
          else
            if here, do: from(i + 1, j + 1, n, m, text, pattern, memo), else: {false, memo}
          end

        {answer, Map.put(memo, {i, j}, answer)}
    end
  end
end
