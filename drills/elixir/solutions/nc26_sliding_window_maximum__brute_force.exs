defmodule Solution do
  def max_sliding_window(_nums, k) when k <= 0, do: []

  def max_sliding_window(nums, k) do
    nums
    |> Enum.chunk_every(k, 1, :discard)
    |> Enum.map(&Enum.max/1)
  end
end
