defmodule Solution do
  # Forget the intervals and keep only their edges: +1 where one opens, -1 where
  # one closes. A merged interval runs from the edge that lifts the running
  # count off zero to the edge that drops it back.
  def merge(intervals) do
    {done, _depth, _start} =
      intervals
      |> Enum.flat_map(fn {s, e} -> [{s, 1}, {e, -1}] end)
      # Opens before closes at the same coordinate, so touching intervals join.
      |> Enum.sort_by(fn {position, delta} -> {position, -delta} end)
      |> Enum.reduce({[], 0, 0}, fn {position, delta}, {done, depth, start} ->
        start = if depth == 0, do: position, else: start

        case depth + delta do
          0 -> {[{start, position} | done], 0, start}
          deeper -> {done, deeper, start}
        end
      end)

    Enum.reverse(done)
  end
end
