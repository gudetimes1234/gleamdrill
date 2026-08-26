defmodule Solution do
  import Bitwise

  # XOR every value against every index it should have had. Each present number
  # meets its own index and cancels; the missing one has an index with no
  # partner, so that index is what survives.
  def missing_number(nums) do
    nums
    |> Enum.with_index()
    |> Enum.reduce(length(nums), fn {n, i}, acc -> bxor(bxor(acc, n), i) end)
  end
end
