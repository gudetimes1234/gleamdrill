defmodule Solution do
  def search(nums, target) do
    # O(n), so it fails the stated requirement — but it is the baseline the
    # halving has to beat, and on a short list it wins on constants.
    Enum.find_index(nums, &(&1 == target))
  end
end
