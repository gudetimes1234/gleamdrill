defmodule Solution do
  def is_interleave(s1, s2, s3) do
    if String.length(s1) + String.length(s2) != String.length(s3) do
      false
    else
      a = s1 |> String.graphemes() |> List.to_tuple()
      b = s2 |> String.graphemes() |> List.to_tuple()
      c = s3 |> String.graphemes() |> List.to_tuple()
      {answer, _memo} = from(0, 0, tuple_size(a), tuple_size(b), a, b, c, %{})
      answer
    end
  end

  # How much of each source has been used is the entire state -- the position in
  # the target is their sum, so it never has to be tracked. That collapse from
  # three indices to two is what makes the table two-dimensional.
  defp from(i, j, n, m, _a, _b, _c, memo) when i >= n and j >= m, do: {true, memo}

  defp from(i, j, n, m, a, b, c, memo) do
    case Map.fetch(memo, {i, j}) do
      {:ok, cached} ->
        {cached, memo}

      :error ->
        target = elem(c, i + j)

        {from_a, memo} =
          if i < n and elem(a, i) == target,
            do: from(i + 1, j, n, m, a, b, c, memo),
            else: {false, memo}

        {answer, memo} =
          if from_a do
            {true, memo}
          else
            if j < m and elem(b, j) == target,
              do: from(i, j + 1, n, m, a, b, c, memo),
              else: {false, memo}
          end

        {answer, Map.put(memo, {i, j}, answer)}
    end
  end
end
