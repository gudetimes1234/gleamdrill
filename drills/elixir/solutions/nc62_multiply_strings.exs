defmodule Solution do
  def multiply("0", _num2), do: "0"
  def multiply(_num1, "0"), do: "0"

  def multiply(num1, num2) do
    a = reversed_digits(num1)
    b = reversed_digits(num2)

    # Long multiplication with the carrying postponed. Digit i of one number
    # times digit j of the other always lands at position i + j, so every
    # product can be dropped straight into its slot and the carries settled in
    # one sweep at the end.
    slots =
      for {x, i} <- Enum.with_index(a), {y, j} <- Enum.with_index(b), reduce: %{} do
        acc -> Map.update(acc, i + j, x * y, &(&1 + x * y))
      end

    {digits, _carry} =
      Enum.map_reduce(0..(length(a) + length(b) - 1)//1, 0, fn i, carry ->
        total = Map.get(slots, i, 0) + carry
        {rem(total, 10), div(total, 10)}
      end)

    digits
    |> Enum.reverse()
    |> Enum.drop_while(&(&1 == 0))
    |> Enum.join()
    |> case do
      "" -> "0"
      text -> text
    end
  end

  defp reversed_digits(text) do
    text |> String.graphemes() |> Enum.reverse() |> Enum.map(&String.to_integer/1)
  end
end
