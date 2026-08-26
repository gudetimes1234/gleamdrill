defmodule Solution do
  def set_zeroes([]), do: []

  # The condition stated outright: a cell is cleared exactly when its own row
  # holds a zero or its own column does. Nothing is recorded and nothing is
  # ordered, so the two-pass trap cannot arise -- at the cost of rescanning a
  # row and a column for every single cell.
  def set_zeroes(matrix) do
    columns = matrix |> Enum.zip_with(& &1) |> List.to_tuple()

    Enum.map(matrix, fn row ->
      row
      |> Enum.with_index()
      |> Enum.map(fn {value, c} ->
        if 0 in row or 0 in elem(columns, c), do: 0, else: value
      end)
    end)
  end
end
