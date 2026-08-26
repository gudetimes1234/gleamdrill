defmodule Solution do
  # Three edits, three neighbours in the table: replace comes from the diagonal,
  # delete from above, insert from the left. Equal characters cost nothing and
  # take the diagonal outright -- the whole algorithm is those four lines. The
  # first row and column are the cost of building a string from nothing, which
  # is its length.
  def min_distance(word1, word2) do
    b = String.graphemes(word2)

    word1
    |> String.graphemes()
    |> Enum.with_index(1)
    |> Enum.reduce(Enum.to_list(0..length(b)//1), fn {from_a, i}, previous ->
      row(previous, b, from_a, i)
    end)
    |> List.last()
  end

  defp row(previous, b, from_a, cost_so_far) do
    {built, _} =
      Enum.map_reduce(Enum.with_index(b), cost_so_far, fn {from_b, j}, left ->
        diagonal = Enum.at(previous, j)
        above = Enum.at(previous, j + 1)
        here = if from_a == from_b, do: diagonal, else: 1 + min(diagonal, min(above, left))
        {here, here}
      end)

    [cost_so_far | built]
  end
end
