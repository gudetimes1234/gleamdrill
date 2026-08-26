defmodule Solution do
  # Binary search over the *values*, not the positions. For a candidate v, count
  # how many numbers are at most v: with no duplicate that count is exactly v,
  # so a count that runs ahead says the repeat is at or below v. O(n log n)
  # against Floyd's O(n), but it needs no insight about cycles -- only that the
  # pigeonhole is what makes the count informative.
  def find_duplicate(nums), do: search(nums, 1, length(nums) - 1)

  defp search(_nums, low, high) when low >= high, do: low

  defp search(nums, low, high) do
    middle = div(low + high, 2)
    seen = Enum.count(nums, &(&1 <= middle))

    if seen > middle,
      do: search(nums, low, middle),
      else: search(nums, middle + 1, high)
  end
end
