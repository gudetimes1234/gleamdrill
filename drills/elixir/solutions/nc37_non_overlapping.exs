defmodule Solution do
  # Greedy on the end: among any set of intervals competing for the same space,
  # keeping the one that finishes earliest leaves the most room for whatever
  # comes next, and can never be worse.
  def erase_overlap_intervals(intervals) do
    {removed, _last_end} =
      intervals
      |> Enum.sort_by(fn {_s, e} -> e end)
      |> Enum.reduce({0, :none}, fn {s, e}, {removed, last_end} ->
        if last_end == :none or s >= last_end,
          do: {removed, e},
          else: {removed + 1, last_end}
      end)

    removed
  end
end
