defmodule Solution do
  def max_sub_array([]), do: 0

  # Kadane: at each position the best subarray ending here either extends the
  # one ending just before it or starts fresh. A running total that has gone
  # negative can only hurt whatever follows, so it is dropped.
  def max_sub_array([first | rest]) do
    {_here, best} =
      Enum.reduce(rest, {first, first}, fn n, {here, best} ->
        here = max(n, here + n)
        {here, max(best, here)}
      end)

    best
  end
end
