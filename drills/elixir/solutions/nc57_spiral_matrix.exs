defmodule Solution do
  # Take the top row, then turn the problem ninety degrees and do it again.
  # Rotating what is left anticlockwise puts the column you would have walked
  # down next along the top, so there is only ever one move to make.
  def spiral_order([]), do: []
  def spiral_order([[] | _]), do: []

  def spiral_order([top | rest]), do: top ++ spiral_order(rotate_anticlockwise(rest))

  defp rotate_anticlockwise([]), do: []

  defp rotate_anticlockwise(matrix) do
    matrix
    |> Enum.zip_with(& &1)
    |> Enum.reverse()
  end
end
