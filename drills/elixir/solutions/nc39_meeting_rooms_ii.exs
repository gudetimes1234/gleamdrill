defmodule Solution do
  # Rooms needed is the most meetings ever running at once, so the meetings
  # themselves stop mattering -- only their edges do. Walk the edges in time
  # order and watch how high the count gets.
  def min_meeting_rooms(intervals) do
    {_depth, best} =
      intervals
      |> Enum.flat_map(fn {s, e} -> [{s, 1}, {e, -1}] end)
      # A room freed at the same moment another meeting starts can be reused, so
      # closes come before opens here -- the opposite of merging intervals.
      |> Enum.sort()
      |> Enum.reduce({0, 0}, fn {_position, delta}, {depth, best} ->
        depth = depth + delta
        {depth, max(best, depth)}
      end)

    best
  end
end
