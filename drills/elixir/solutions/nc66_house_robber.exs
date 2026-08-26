defmodule Solution do
  # At each house the choice is take it and add what was safe two houses back,
  # or skip it and keep the best so far. Both answers are one number, so the
  # whole table collapses to a pair.
  def rob(nums) do
    {best, _previous} =
      Enum.reduce(nums, {0, 0}, fn value, {best, previous} ->
        {max(best, previous + value), best}
      end)

    best
  end
end
