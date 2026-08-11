defmodule Solution do
  def contains_duplicate?(nums) do
    # A MapSet collapses duplicates, so a shrunken size is the answer.
    MapSet.size(MapSet.new(nums)) != length(nums)
  end
end
