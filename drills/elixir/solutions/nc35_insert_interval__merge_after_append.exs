defmodule Solution do
  # Drop the new interval on the end and run the general merge. Throws away the
  # fact that the input was sorted -- O(n log n) rather than O(n) -- but it
  # reuses a solution you already have rather than a three-way split.
  def insert(intervals, new_interval) do
    [new_interval | intervals]
    |> Enum.sort_by(fn {s, _e} -> s end)
    |> Enum.reduce([], fn
      {s, e}, [{start, finish} | rest] when s <= finish -> [{start, max(finish, e)} | rest]
      interval, acc -> [interval | acc]
    end)
    |> Enum.reverse()
  end
end
