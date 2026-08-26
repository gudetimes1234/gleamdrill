defmodule Solution do
  def min_window("", _t), do: ""
  def min_window(_s, ""), do: ""

  def min_window(s, t) do
    need = Enum.frequencies(String.graphemes(t))

    # Only the positions that could possibly matter. For a long haystack and a
    # short needle this is a far shorter walk than the whole string.
    positions =
      s
      |> String.graphemes()
      |> Enum.with_index()
      |> Enum.filter(fn {c, _i} -> Map.has_key?(need, c) end)
      |> Enum.map(fn {c, i} -> {i, c} end)

    case scan(positions, positions, need, %{}, 0, map_size(need), -1, {0, 0}) do
      {_start, 0} -> ""
      {start, length} -> String.slice(s, start, length)
    end
  end

  # Counts how many of the needle's distinct characters are fully covered,
  # rather than how many characters are still missing. Same window, different
  # bookkeeping: `satisfied` only moves when a count crosses its requirement.
  defp scan(right, left, need, window, satisfied, distinct, last_index, best)

  defp scan(right, [{start, c} | left_rest], need, window, satisfied, distinct, last_index, best)
       when satisfied == distinct do
    length = last_index - start + 1

    best =
      if elem(best, 1) == 0 or length < elem(best, 1), do: {start, length}, else: best

    lowered = Map.get(window, c, 0) - 1

    scan(
      right,
      left_rest,
      need,
      Map.put(window, c, lowered),
      if(lowered < Map.get(need, c, 0), do: satisfied - 1, else: satisfied),
      distinct,
      last_index,
      best
    )
  end

  defp scan([], _left, _need, _window, _satisfied, _distinct, _last_index, best), do: best

  defp scan([{index, c} | right_rest], left, need, window, satisfied, distinct, _last, best) do
    raised = Map.get(window, c, 0) + 1

    scan(
      right_rest,
      left,
      need,
      Map.put(window, c, raised),
      if(raised == Map.get(need, c, 0), do: satisfied + 1, else: satisfied),
      distinct,
      index,
      best
    )
  end
end
