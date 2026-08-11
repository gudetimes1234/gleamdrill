defmodule Solution do
  def two_sum(nums, target) do
    indexed = Enum.with_index(nums)

    # A comprehension over every ordered pair, stopping at the first hit.
    Enum.find_value(indexed, fn {a, i} ->
      Enum.find_value(indexed, fn {b, j} ->
        if j > i and a + b == target, do: {i, j}
      end)
    end)
  end
end
