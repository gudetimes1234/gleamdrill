defmodule Solution do
  def product_except_self(nums) do
    indexed = Enum.with_index(nums)

    Enum.map(indexed, fn {_num, i} ->
      indexed
      |> Enum.reject(fn {_other, j} -> j == i end)
      |> Enum.map(fn {other, _j} -> other end)
      |> Enum.product()
    end)
  end
end
