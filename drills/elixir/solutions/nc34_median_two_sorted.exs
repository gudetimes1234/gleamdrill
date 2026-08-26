defmodule Solution do
  def find_median_sorted_arrays([], []), do: 0.0

  def find_median_sorted_arrays(nums1, nums2) do
    total = length(nums1) + length(nums2)
    {previous, current} = advance(nums1, nums2, div(total, 2) + 1, 0, 0)

    if rem(total, 2) == 1, do: current / 1, else: (previous + current) / 2
  end

  # Merge, but stop at the middle and keep only the last two values seen: the
  # merged list is never built, so this is O(m + n) time and no extra space.
  defp advance(_a, _b, steps, previous, current) when steps <= 0, do: {previous, current}
  defp advance([], [], _steps, previous, current), do: {previous, current}

  defp advance([x | rest], [y | _] = b, steps, _previous, current) when x <= y,
    do: advance(rest, b, steps - 1, current, x)

  defp advance([x | rest], [], steps, _previous, current),
    do: advance(rest, [], steps - 1, current, x)

  defp advance(a, [y | rest], steps, _previous, current),
    do: advance(a, rest, steps - 1, current, y)
end
