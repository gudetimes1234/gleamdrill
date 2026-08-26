defmodule Solution do
  # Answer each query once, and never revisit it. Taking the intervals shortest
  # first means the first interval to cover a query is already its answer, so
  # every query leaves the pool the moment it is settled and the pool only ever
  # shrinks.
  def min_interval(intervals, queries) do
    numbered = Enum.with_index(queries)

    {answered, unanswered} =
      intervals
      |> Enum.sort_by(fn {s, e} -> e - s end)
      |> Enum.reduce({%{}, numbered}, fn {s, e}, {answers, waiting} ->
        {covered, still_waiting} =
          Enum.split_with(waiting, fn {query, _index} -> s <= query and query <= e end)

        answers =
          Enum.reduce(covered, answers, fn {_query, index}, acc ->
            Map.put(acc, index, e - s + 1)
          end)

        {answers, still_waiting}
      end)

    answers =
      Enum.reduce(unanswered, answered, fn {_query, index}, acc ->
        Map.put(acc, index, -1)
      end)

    Enum.map(0..(length(queries) - 1)//1, &Map.fetch!(answers, &1))
  end
end
