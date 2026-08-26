defmodule Solution do
  import Bitwise

  @mask 0xFFFFFFFF
  @largest 0x7FFFFFFF

  # Addition without +. XOR is addition that forgets to carry; AND finds exactly
  # the places a carry was owed, and shifting it left one puts it where it
  # belongs. Repeat until nothing is owed.
  def get_sum(a, b) do
    result = add(a &&& @mask, b &&& @mask)

    # Erlang integers are arbitrary precision, so negatives have to be put back
    # by hand: a 32-bit pattern above the signed maximum is a negative number.
    if result <= @largest, do: result, else: bnot(bxor(result, @mask))
  end

  defp add(a, 0), do: a

  defp add(a, b), do: add(bxor(a, b) &&& @mask, (a &&& b) <<< 1 &&& @mask)
end
