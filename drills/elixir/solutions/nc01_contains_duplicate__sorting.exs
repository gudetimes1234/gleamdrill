defmodule Solution do
  def contains_duplicate?(nums) do
    # Duplicates are adjacent once sorted, so a sliding pair over the sorted
    # list answers it without holding every value in a set.
    nums
    |> Enum.sort()
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.any?(fn [a, b] -> a == b end)
  end
end
