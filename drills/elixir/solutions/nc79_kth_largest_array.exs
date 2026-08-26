defmodule Solution do
  # Sorting answers every k at once, which is more than asked for but is the
  # version nobody gets wrong. O(n log n).
  def find_kth_largest(nums, k) when k < 1 or k > length(nums), do: nil

  def find_kth_largest(nums, k), do: nums |> Enum.sort(:desc) |> Enum.at(k - 1)
end
