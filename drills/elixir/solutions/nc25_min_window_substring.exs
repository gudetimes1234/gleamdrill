defmodule Solution do
  def min_window("", _t), do: ""
  def min_window(_s, ""), do: ""

  def min_window(s, t) do
    graphemes = String.graphemes(s)
    need = Enum.frequencies(String.graphemes(t))

    case scan(graphemes, 0, graphemes, 0, need, String.length(t), {0, 0}) do
      {_start, 0} -> ""
      {start, length} -> String.slice(s, start, length)
    end
  end

  # The window is the gap between two views of the same list: `right` is what
  # has not been taken in yet, `left` is everything from the window's start
  # onwards. Advancing either end is one list head.
  #
  # This clause matches only while nothing is missing, so the window is valid:
  # record it, then give a character back from the left.
  defp scan(right, right_index, [c | left_rest], left_index, counts, 0, best) do
    length = right_index - left_index

    best =
      if elem(best, 1) == 0 or length < elem(best, 1),
        do: {left_index, length},
        else: best

    raised = Map.get(counts, c, 0) + 1

    scan(
      right,
      right_index,
      left_rest,
      left_index + 1,
      Map.put(counts, c, raised),
      if(raised > 0, do: 1, else: 0),
      best
    )
  end

  defp scan([], _right_index, _left, _left_index, _counts, _missing, best), do: best

  defp scan([c | right_rest], right_index, left, left_index, counts, missing, best) do
    current = Map.get(counts, c, 0)

    scan(
      right_rest,
      right_index + 1,
      left,
      left_index,
      Map.put(counts, c, current - 1),
      if(current > 0, do: missing - 1, else: missing),
      best
    )
  end
end
