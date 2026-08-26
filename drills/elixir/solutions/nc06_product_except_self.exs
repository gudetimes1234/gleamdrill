defmodule Solution do
  def product_except_self(nums) do
    prefixes = nums |> Enum.scan(1, &(&1 * &2)) |> then(&[1 | Enum.drop(&1, -1)])

    suffixes =
      nums
      |> Enum.reverse()
      |> Enum.scan(1, &(&1 * &2))
      |> then(&[1 | Enum.drop(&1, -1)])
      |> Enum.reverse()

    Enum.zip_with(prefixes, suffixes, &(&1 * &2))
  end
end
