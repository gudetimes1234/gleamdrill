defmodule Solution do
  import Bitwise

  @mask 0xFFFFFFFF
  @largest 0x7FFFFFFF

  # The same addition written as hardware: thirty-two full adders in a row, each
  # taking two input bits and a carry and producing a sum bit and a carry out.
  # Slower than the XOR loop, which stops as soon as no carries are left, but it
  # is where the XOR loop comes from.
  def get_sum(a, b) do
    {result, _carry} =
      Enum.reduce(0..31//1, {0, 0}, fn i, {result, carry} ->
        x = a >>> i &&& 1
        y = b >>> i &&& 1
        xor = bxor(x, y)
        {result ||| bxor(xor, carry) <<< i, (x &&& y) ||| (carry &&& xor)}
      end)

    if result <= @largest, do: result, else: bnot(bxor(result, @mask))
  end
end
