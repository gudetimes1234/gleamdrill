defmodule Solution do
  # Pick each element in turn as the first, then permute what is left. Removing
  # the chosen element from the remainder is what the "used" set does in an
  # in-place version -- here the remainder is simply a shorter list.
  def permute([]), do: [[]]

  def permute(nums) do
    for {value, i} <- Enum.with_index(nums),
        tail <- permute(List.delete_at(nums, i)),
        do: [value | tail]
  end
end
