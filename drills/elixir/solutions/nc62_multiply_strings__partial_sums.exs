defmodule Solution do
  def multiply("0", _num2), do: "0"
  def multiply(_num1, "0"), do: "0"

  # Long multiplication exactly as taught: one partial product per digit of the
  # second number, each shifted left by its position, all added up. It needs
  # string addition as well as string multiplication, which is why the
  # accumulating version exists -- but writing add once is worth it.
  def multiply(num1, num2) do
    num2
    |> String.graphemes()
    |> Enum.reverse()
    |> Enum.with_index()
    |> Enum.map(fn {digit, shift} ->
      times_digit(num1, String.to_integer(digit)) <> String.duplicate("0", shift)
    end)
    |> Enum.reduce("0", &add/2)
  end

  defp times_digit(number, digit) do
    {carry, digits} =
      number
      |> String.graphemes()
      |> Enum.reverse()
      |> Enum.map(&String.to_integer/1)
      |> Enum.reduce({0, []}, fn d, {carry, acc} ->
        product = d * digit + carry
        {div(product, 10), [rem(product, 10) | acc]}
      end)

    trim(if carry == 0, do: digits, else: [carry | digits])
  end

  defp add(left, right) do
    a = padded(left, right)
    b = padded(right, left)

    {carry, digits} =
      Enum.zip(Enum.reverse(a), Enum.reverse(b))
      |> Enum.reduce({0, []}, fn {x, y}, {carry, acc} ->
        total = x + y + carry
        {div(total, 10), [rem(total, 10) | acc]}
      end)

    trim(if carry == 0, do: digits, else: [carry | digits])
  end

  defp padded(text, other) do
    width = max(String.length(text), String.length(other))

    text
    |> String.pad_leading(width, "0")
    |> String.graphemes()
    |> Enum.map(&String.to_integer/1)
  end

  defp trim(digits) do
    case digits |> Enum.drop_while(&(&1 == 0)) |> Enum.join() do
      "" -> "0"
      text -> text
    end
  end
end
