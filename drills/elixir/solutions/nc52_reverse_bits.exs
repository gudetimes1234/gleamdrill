defmodule Solution do
  import Bitwise

  # Peel the bottom bit off the input and push it onto the bottom of the result:
  # the first bit out is the last bit in. Fixed at 32 rounds, because the width
  # is part of the problem rather than a property of the value.
  def reverse_bits(n) do
    {_remaining, reversed} =
      Enum.reduce(1..32//1, {n, 0}, fn _, {remaining, reversed} ->
        {remaining >>> 1, reversed <<< 1 ||| (remaining &&& 1)}
      end)

    reversed
  end
end
