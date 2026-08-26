defmodule Solution do
  import Bitwise

  def count_bits(n), do: Enum.map(0..n//1, &popcount/1)

  # Each number counted from scratch with the clear-lowest-bit trick.
  # O(n log n) against the dynamic version's O(n), and it remembers nothing
  # between numbers -- which is exactly what the other one exploits.
  defp popcount(0), do: 0
  defp popcount(n), do: 1 + popcount(n &&& (n - 1))
end
