defmodule Solution do
  def find_median_sorted_arrays([], []), do: 0.0

  def find_median_sorted_arrays(nums1, nums2) do
    merged = Enum.sort(nums1 ++ nums2)
    total = length(merged)

    # One expression for both parities: for an odd length the two indices are
    # the same element, so the average of it with itself is itself.
    (Enum.at(merged, div(total, 2)) + Enum.at(merged, div(total - 1, 2))) / 2
  end
end
