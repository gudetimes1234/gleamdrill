defmodule Solution do
  def max_product([]), do: 0

  # A different argument entirely: the best subarray always runs to one end of
  # the block it sits in, so sweeping running products from both directions --
  # resetting at every zero -- is enough.
  def max_product(nums), do: max(sweep(nums), sweep(Enum.reverse(nums)))

  defp sweep(nums) do
    {_running, best} =
      Enum.reduce(nums, {1, :none}, fn n, {running, best} ->
        running = if running == 0, do: n, else: running * n
        {running, if(best == :none, do: running, else: max(best, running))}
      end)

    best
  end
end
