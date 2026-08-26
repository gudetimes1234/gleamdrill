defmodule Solution do
  def num_distinct(s, t) do
    source = s |> String.graphemes() |> List.to_tuple()
    target = t |> String.graphemes() |> List.to_tuple()
    {count, _memo} = from(0, 0, tuple_size(source), tuple_size(target), source, target, %{})
    count
  end

  # The choice written out: when the characters match, either use this source
  # character for this target character or skip it; when they do not, skipping
  # is the only option. Running out of target is one complete subsequence, which
  # is why the base case is 1 rather than 0.
  defp from(_i, j, _n, m, _source, _target, memo) when j >= m, do: {1, memo}
  defp from(i, _j, n, _m, _source, _target, memo) when i >= n, do: {0, memo}

  defp from(i, j, n, m, source, target, memo) do
    case Map.fetch(memo, {i, j}) do
      {:ok, cached} ->
        {cached, memo}

      :error ->
        {skipping, memo} = from(i + 1, j, n, m, source, target, memo)

        {using, memo} =
          if elem(source, i) == elem(target, j),
            do: from(i + 1, j + 1, n, m, source, target, memo),
            else: {0, memo}

        {skipping + using, Map.put(memo, {i, j}, skipping + using)}
    end
  end
end
