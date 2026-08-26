defmodule Solution do
  # Every pair, checked. Two intervals overlap when each starts before the other
  # ends -- the condition worth being able to write from memory, since it is
  # easier to get right than its negation.
  def can_attend_meetings?(intervals) do
    pairs =
      for {a, i} <- Enum.with_index(intervals),
          {b, j} <- Enum.with_index(intervals),
          i < j,
          do: {a, b}

    Enum.all?(pairs, fn {{s1, e1}, {s2, e2}} -> not (s1 < e2 and s2 < e1) end)
  end
end
