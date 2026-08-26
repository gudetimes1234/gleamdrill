defmodule Solution do
  def contains_duplicate?(nums) do
    MapSet.size(MapSet.new(nums)) != length(nums)
  end
end
