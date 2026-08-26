defmodule Solution do
  # Bottom-up over the same two-index state. Row i says which prefixes of s2 can
  # pair with the first i characters of s1; each row depends only on the one
  # above and on itself to the left, so one row suffices.
  def is_interleave(s1, s2, s3) do
    if String.length(s1) + String.length(s2) != String.length(s3) do
      false
    else
      a = String.graphemes(s1)
      b = String.graphemes(s2)
      c = s3 |> String.graphemes() |> List.to_tuple()

      start = first_row(b, c)

      a
      |> Enum.with_index()
      |> Enum.reduce(start, fn {from_a, i}, previous -> next_row(previous, b, c, from_a, i) end)
      |> List.last()
    end
  end

  defp first_row(b, c) do
    {row, _} =
      Enum.map_reduce(b, {true, 0}, fn from_b, {ok, j} ->
        ok = ok and from_b == elem(c, j)
        {ok, {ok, j + 1}}
      end)

    [true | row]
  end

  defp next_row(previous, b, c, from_a, i) do
    head = Enum.at(previous, 0) and from_a == elem(c, i)

    {row, _} =
      Enum.map_reduce(Enum.with_index(b), head, fn {from_b, j}, left ->
        target = elem(c, i + j + 1)
        here = (Enum.at(previous, j + 1) and from_a == target) or (left and from_b == target)
        {here, here}
      end)

    [head | row]
  end
end
