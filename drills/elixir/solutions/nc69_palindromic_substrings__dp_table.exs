defmodule Solution do
  def count_substrings(""), do: 0

  # The table says whether s[i..j] is a palindrome. It is when its ends match
  # and whatever is between them already was -- so the spans have to be filled
  # shortest first, which is the whole reason for the outer loop over length.
  def count_substrings(s) do
    chars = s |> String.graphemes() |> List.to_tuple()
    n = tuple_size(chars)

    {_table, total} =
      for length <- 0..(n - 1)//1, i <- 0..(n - 1)//1, i + length < n, reduce: {%{}, 0} do
        {table, total} ->
          j = i + length
          inside = if j - i < 2, do: true, else: Map.fetch!(table, {i + 1, j - 1})
          palindrome = elem(chars, i) == elem(chars, j) and inside
          {Map.put(table, {i, j}, palindrome), if(palindrome, do: total + 1, else: total)}
      end

    total
  end
end
