defmodule Solution do
  # Sorted by start, the only meeting a given one can clash with is the one
  # immediately before it -- anything earlier started earlier still and would
  # have clashed with that one first.
  def can_attend_meetings?(intervals) do
    intervals
    |> Enum.sort_by(fn {s, _e} -> s end)
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.all?(fn [{_s1, e1}, {s2, _e2}] -> e1 <= s2 end)
  end
end
