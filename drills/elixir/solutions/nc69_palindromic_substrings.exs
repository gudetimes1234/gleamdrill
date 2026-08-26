defmodule Solution do
  def count_substrings(""), do: 0

  # Same 2n centres as finding the longest one, except that here every
  # successful widening is itself an answer, so the count is how many times the
  # expansion succeeded rather than how far it got.
  def count_substrings(s) do
    chars = s |> String.graphemes() |> List.to_tuple()
    n = tuple_size(chars)

    Enum.reduce(0..(n - 1)//1, 0, fn i, total ->
      total + grow(chars, n, i, i) + grow(chars, n, i, i + 1)
    end)
  end

  defp grow(chars, n, left, right) do
    if left >= 0 and right < n and elem(chars, left) == elem(chars, right),
      do: 1 + grow(chars, n, left - 1, right + 1),
      else: 0
  end
end
