defmodule Solution do
  import Bitwise

  # Every number is some smaller number with one extra bit on the end: count(i)
  # is count(i >>> 1) plus whatever that last bit is. Each answer costs one
  # lookup, so the whole list is O(n).
  def count_bits(n) do
    counts =
      Enum.reduce(0..n//1, %{}, fn i, acc ->
        value = if i == 0, do: 0, else: Map.fetch!(acc, i >>> 1) + (i &&& 1)
        Map.put(acc, i, value)
      end)

    Enum.map(0..n//1, &Map.fetch!(counts, &1))
  end
end
