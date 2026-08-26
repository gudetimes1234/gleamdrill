defmodule Solution do
  def longest_palindrome(""), do: ""

  # Every palindrome has a centre, and there are only 2n of them -- n single
  # characters and n gaps between them. Growing outwards from each is O(n^2)
  # total and needs no table.
  def longest_palindrome(s) do
    chars = s |> String.graphemes() |> List.to_tuple()
    n = tuple_size(chars)

    {start, length} =
      Enum.reduce(0..(n - 1)//1, {0, 0}, fn i, best ->
        Enum.reduce([{i, i}, {i, i + 1}], best, fn {left, right}, best ->
          found = expand(chars, n, left, right)
          if elem(found, 1) > elem(best, 1), do: found, else: best
        end)
      end)

    String.slice(s, start, length)
  end

  # Widens while the ends match, then reports where it stopped as a start and a
  # length. The two pointers have gone one step too far by then, which is where
  # the +1 and the -1 come from.
  defp expand(chars, n, left, right) do
    if left >= 0 and right < n and elem(chars, left) == elem(chars, right) do
      expand(chars, n, left - 1, right + 1)
    else
      {left + 1, right - left - 1}
    end
  end
end
