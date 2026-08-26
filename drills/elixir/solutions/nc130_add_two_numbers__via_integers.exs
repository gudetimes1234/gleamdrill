defmodule Solution do
  # Turn both lists into whole numbers, add, and take the sum apart again. It
  # reads well and is fine in Elixir, whose integers are arbitrary precision --
  # but it is the version that breaks the moment the language has a fixed-width
  # integer, which is precisely why the problem is posed as a list of digits.
  def add_two_numbers(first, second), do: to_digits(value(first) + value(second))

  defp value(digits) do
    digits
    |> Enum.with_index()
    |> Enum.reduce(0, fn {digit, i}, total -> total + digit * 10 ** i end)
  end

  defp to_digits(number) when number < 10, do: [number]
  defp to_digits(number), do: [rem(number, 10) | to_digits(div(number, 10))]
end
