defmodule Solution do
  import Bitwise

  # n &&& (n - 1) clears the lowest set bit and nothing else, so the recursion
  # runs once per one bit rather than once per bit position.
  def hamming_weight(0), do: 0
  def hamming_weight(n), do: 1 + hamming_weight(n &&& (n - 1))
end
