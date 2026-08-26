defmodule Solution do
  import Bitwise

  # XOR is its own inverse and does not care about order, so every value that
  # appears twice cancels itself out and only the lone one survives.
  def single_number(nums), do: Enum.reduce(nums, 0, &bxor/2)
end
