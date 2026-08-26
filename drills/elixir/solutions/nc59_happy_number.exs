defmodule Solution do
  # The sequence has to repeat eventually -- squares of digits are bounded, so
  # there are only finitely many values it can reach. Remembering what has been
  # seen turns "does it loop?" into a set lookup.
  def is_happy(n), do: walk(n, MapSet.new())

  defp walk(1, _seen), do: true

  defp walk(n, seen) do
    if MapSet.member?(seen, n),
      do: false,
      else: walk(square_digits(n), MapSet.put(seen, n))
  end

  defp square_digits(0), do: 0
  defp square_digits(n), do: rem(n, 10) * rem(n, 10) + square_digits(div(n, 10))
end
