defmodule Solution do
  def rob([]), do: 0
  def rob([only]), do: only

  # The circle only matters through one constraint: the first and last houses
  # are neighbours, so at most one of them is robbed. Ruling each out in turn
  # leaves two ordinary straight-line problems, and the answer is the better.
  def rob(nums) do
    max(straight(tl(nums)), straight(Enum.drop(nums, -1)))
  end

  defp straight(nums) do
    {best, _previous} =
      Enum.reduce(nums, {0, 0}, fn value, {best, previous} ->
        {max(best, previous + value), best}
      end)

    best
  end
end
