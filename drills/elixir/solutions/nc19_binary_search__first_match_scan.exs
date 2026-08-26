defmodule Solution do
  def search(nums, target) do
    Enum.find_index(nums, &(&1 == target))
  end
end
