defmodule Solution do
  def contains_duplicate?(nums) do
    nums
    |> Enum.sort()
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.any?(fn [a, b] -> a == b end)
  end
end
