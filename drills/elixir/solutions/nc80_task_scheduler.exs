defmodule Solution do
  def least_interval([], _n), do: 0

  def least_interval(tasks, n) do
    frequencies = tasks |> Enum.frequencies() |> Map.values()
    busiest = Enum.max(frequencies)
    ties = Enum.count(frequencies, &(&1 == busiest))

    # Lay the most frequent task out first with gaps of n between its copies.
    # That skeleton is (busiest - 1) full frames of n + 1 slots, plus the final
    # row of every task tied for busiest. Everything else either fits into an
    # idle slot or has already pushed the total past the skeleton -- in which
    # case no idling happens and the answer is just the number of tasks.
    max(length(tasks), (busiest - 1) * (n + 1) + ties)
  end
end
