defmodule Solution do
  # The same question with no memory at all: run one pointer at single speed and
  # another at double, and they meet inside whatever cycle exists. Meeting at 1
  # means the cycle is the fixed point; meeting anywhere else means it is not.
  # Constant space, which is the whole reason to know it.
  def is_happy(n), do: chase(n, square_digits(n))

  defp chase(same, same), do: same == 1

  defp chase(slow, fast),
    do: chase(square_digits(slow), fast |> square_digits() |> square_digits())

  defp square_digits(0), do: 0
  defp square_digits(n), do: rem(n, 10) * rem(n, 10) + square_digits(div(n, 10))
end
