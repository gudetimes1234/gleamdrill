defmodule Solution do
  def max_sub_array([]), do: 0

  # The sum from i to j is prefix[j] - prefix[i-1], so the best subarray ending
  # at j is prefix[j] minus the smallest prefix before it. One pass carrying
  # that minimum answers the whole thing.
  def max_sub_array(nums) do
    {_running, _smallest, best} =
      Enum.reduce(nums, {0, 0, :none}, fn n, {running, smallest, best} ->
        running = running + n
        candidate = running - smallest
        best = if best == :none, do: candidate, else: max(best, candidate)
        {running, min(smallest, running), best}
      end)

    best
  end
end
