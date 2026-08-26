defmodule Solution do
  # Both numbers arrive least significant digit first, which is exactly the
  # order addition wants -- no reversing, no length matching, just carry along.
  # The carry outliving both lists is the case worth writing down: 5 + 5 is two
  # digits from two one-digit numbers.
  def add_two_numbers(first, second), do: add(first, second, 0)

  defp add([], [], 0), do: []
  defp add([], [], carry), do: [carry]

  defp add(first, second, carry) do
    {a, a_rest} = split(first)
    {b, b_rest} = split(second)
    total = a + b + carry
    [rem(total, 10) | add(a_rest, b_rest, div(total, 10))]
  end

  defp split([]), do: {0, []}
  defp split([head | tail]), do: {head, tail}
end
