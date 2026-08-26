defmodule Solution do
  def min_interval(intervals, queries) do
    Enum.map(queries, fn query ->
      intervals
      |> Enum.filter(fn {s, e} -> s <= query and query <= e end)
      |> Enum.map(fn {s, e} -> e - s + 1 end)
      |> case do
        [] -> -1
        lengths -> Enum.min(lengths)
      end
    end)
  end
end
