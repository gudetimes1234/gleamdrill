defmodule Solution do
  # Straight from where each element lands: after a clockwise quarter turn the
  # entry at (row, column) came from (n - 1 - column, row). Writing the mapping
  # out once is the surest way not to get the direction backwards.
  def rotate([]), do: []

  def rotate(matrix) do
    n = length(matrix)
    rows = List.to_tuple(Enum.map(matrix, &List.to_tuple/1))

    for r <- 0..(n - 1)//1 do
      for c <- 0..(n - 1)//1, do: rows |> elem(n - 1 - c) |> elem(r)
    end
  end
end
