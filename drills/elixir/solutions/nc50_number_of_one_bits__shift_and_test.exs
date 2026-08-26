defmodule Solution do
  import Bitwise

  # One step per bit position rather than per set bit: 32 iterations whatever
  # the input, but nothing to remember beyond "look at the bottom bit, shift".
  def hamming_weight(n), do: count(n, 0)

  defp count(n, total) when n <= 0, do: total
  defp count(n, total), do: count(n >>> 1, total + (n &&& 1))
end
