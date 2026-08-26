defmodule Solution do
  # The busiest moment is always the start of some meeting, so there are only n
  # moments worth testing. Count how many meetings cover each one and take the
  # largest -- O(n^2), and it needs no sort and no edge bookkeeping.
  def min_meeting_rooms(intervals) do
    Enum.reduce(intervals, 0, fn {start, _end}, best ->
      running = Enum.count(intervals, fn {s, e} -> s <= start and start < e end)
      max(best, running)
    end)
  end
end
