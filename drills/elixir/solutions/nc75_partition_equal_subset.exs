defmodule Solution do
  # Subset sum in disguise: an equal split exists exactly when some subset adds
  # up to half the total. Carry the set of sums reachable so far and widen it by
  # each number -- no ordering, no table, and duplicates cost nothing because a
  # set collapses them.
  def can_partition(nums) do
    total = Enum.sum(nums)

    if rem(total, 2) != 0 do
      false
    else
      half = div(total, 2)

      reachable =
        Enum.reduce(nums, MapSet.new([0]), fn n, sums ->
          sums
          |> Enum.map(&(&1 + n))
          |> Enum.filter(&(&1 <= half))
          |> MapSet.new()
          |> MapSet.union(sums)
        end)

      MapSet.member?(reachable, half)
    end
  end
end
