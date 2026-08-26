defmodule Solution do
  # Sorted by start instead: on an overlap you must drop one of the two, and
  # dropping whichever ends later is always at least as good. Same greedy
  # argument, made at the moment of the clash rather than in the sort order.
  def erase_overlap_intervals(intervals) do
    {removed, _last_end} =
      intervals
      |> Enum.sort_by(fn {s, _e} -> s end)
      |> Enum.reduce({0, :none}, fn {s, e}, {removed, last_end} ->
        cond do
          last_end == :none -> {removed, e}
          s >= last_end -> {removed, e}
          true -> {removed + 1, min(last_end, e)}
        end
      end)

    removed
  end
end
