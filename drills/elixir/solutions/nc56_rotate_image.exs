defmodule Solution do
  # A quarter turn is a reflection through the main diagonal followed by a
  # reflection through the vertical centre line. Two easy operations instead of
  # one four-way element cycle, and neither needs index arithmetic.
  def rotate([]), do: []

  def rotate(matrix) do
    matrix
    |> Enum.zip_with(& &1)
    |> Enum.map(&Enum.reverse/1)
  end
end
