defmodule Solution do
  @largest 2_147_483_647
  @smallest -2_147_483_648

  def reverse(x) do
    sign = if x < 0, do: -1, else: 1
    result = sign * build(abs(x), 0)
    if result > @largest or result < @smallest, do: 0, else: result
  end

  # Peel a digit off the bottom of the input and push it onto the bottom of the
  # result. The overflow test has to happen *before* the multiply, because in a
  # fixed-width language the multiply is where the value would be lost.
  defp build(0, result), do: result

  defp build(remaining, result) do
    if result > div(@largest, 10),
      do: 0,
      else: build(div(remaining, 10), result * 10 + rem(remaining, 10))
  end
end
