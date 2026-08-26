defmodule Solution do
  def find_kth_largest(nums, k) when k < 1 or k > length(nums), do: nil

  def find_kth_largest(nums, k), do: select(nums, k)

  # Quickselect: partition around a pivot, then recurse into the side that must
  # contain the answer rather than sorting both. Expected O(n), because the work
  # halves each time instead of being repeated -- the same saving binary search
  # makes over a scan.
  defp select([pivot | rest], k) do
    bigger = Enum.filter(rest, &(&1 > pivot))
    equal = Enum.filter(rest, &(&1 == pivot))
    smaller = Enum.filter(rest, &(&1 < pivot))
    above = length(bigger)

    cond do
      k <= above -> select(bigger, k)
      k <= above + 1 + length(equal) -> pivot
      true -> select(smaller, k - above - 1 - length(equal))
    end
  end
end
