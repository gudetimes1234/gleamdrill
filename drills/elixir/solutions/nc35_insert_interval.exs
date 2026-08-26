defmodule Solution do
  def insert(intervals, {start, finish}) do
    # The input is already sorted, so the list falls into three runs: everything
    # that finishes before the new one starts, everything that touches it, and
    # everything that starts after it ends.
    {before, rest} = Enum.split_while(intervals, fn {_s, e} -> e < start end)
    {overlapping, later} = Enum.split_while(rest, fn {s, _e} -> s <= finish end)

    merged =
      Enum.reduce(overlapping, {start, finish}, fn {s, e}, {acc_s, acc_e} ->
        {min(acc_s, s), max(acc_e, e)}
      end)

    before ++ [merged] ++ later
  end
end
