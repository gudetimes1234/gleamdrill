defmodule Solution do
  # Twice the sum of the distinct values counts every pair twice and the lone
  # value twice; subtracting the real total leaves the lone value. No bit
  # tricks, but it leans harder on the promise that everything else is a pair.
  def single_number(nums) do
    2 * (nums |> Enum.uniq() |> Enum.sum()) - Enum.sum(nums)
  end
end
