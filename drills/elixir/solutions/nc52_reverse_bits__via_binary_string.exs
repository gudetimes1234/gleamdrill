defmodule Solution do
  # Write the number out in binary, pad to the full width, reverse the text,
  # read it back. Slower and allocates, but the padding makes the thing the bit
  # version keeps implicit -- that the width is 32, not however many bits this
  # particular value happens to need -- impossible to forget.
  def reverse_bits(n) do
    n
    |> Integer.to_string(2)
    |> String.pad_leading(32, "0")
    |> String.reverse()
    |> String.to_integer(2)
  end
end
