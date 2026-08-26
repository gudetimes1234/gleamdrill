defmodule Solution do
  # The state that matters is only the running total, not which signs produced
  # it -- so carry a map from reachable total to how many ways reach it, and
  # widen it by each number twice, once added and once subtracted. Different
  # sign choices landing on the same total merge, which is what stops the count
  # being exponential in work.
  def find_target_sum_ways(nums, target) do
    nums
    |> Enum.reduce(%{0 => 1}, fn n, totals ->
      Enum.reduce(totals, %{}, fn {total, count}, following ->
        following
        |> Map.update(total + n, count, &(&1 + count))
        |> Map.update(total - n, count, &(&1 + count))
      end)
    end)
    |> Map.get(target, 0)
  end
end
