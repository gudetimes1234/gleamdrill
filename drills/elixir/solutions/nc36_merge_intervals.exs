defmodule Solution do
  # Sorted by start, an interval can only ever overlap the one being built, so a
  # single reduce is enough: extend it, or begin a new one.
  def merge(intervals) do
    intervals
    |> Enum.sort_by(fn {s, _e} -> s end)
    |> Enum.reduce([], fn
      {s, e}, [{start, finish} | rest] when s <= finish -> [{start, max(finish, e)} | rest]
      interval, acc -> [interval | acc]
    end)
    |> Enum.reverse()
  end
end
