defmodule Solution do
  def product_except_self(nums) do
    # The obvious O(n^2) reading: for each slot, multiply everything else.
    indexed = Enum.with_index(nums)

    Enum.map(indexed, fn {_num, i} ->
      indexed
      |> Enum.reject(fn {_other, j} -> j == i end)
      |> Enum.map(fn {other, _j} -> other end)
      |> Enum.product()
    end)
  end
end
