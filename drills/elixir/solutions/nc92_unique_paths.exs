defmodule Solution do
  def unique_paths(m, n) when m <= 0 or n <= 0, do: 0

  # Only right and down moves, so the ways to reach a square are the ways to
  # reach the one above plus the one to its left. Rows are filled top to bottom,
  # and only the row above is ever needed -- so one row of counters does for the
  # whole grid.
  def unique_paths(m, n) do
    1..m//1
    |> Enum.reduce(List.duplicate(1, n), fn
      1, row -> row
      _, row -> running_sums(row)
    end)
    |> List.last()
  end

  # Each entry gains everything to its left, which is the left-hand neighbour
  # term of the recurrence applied across the row.
  defp running_sums(row) do
    {out, _} = Enum.map_reduce(row, 0, fn value, running -> {running + value, running + value} end)
    out
  end
end
