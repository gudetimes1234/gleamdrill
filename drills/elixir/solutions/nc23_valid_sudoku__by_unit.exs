defmodule Solution do
  def valid_sudoku?(board), do: Enum.all?(units(board), &no_duplicates?/1)

  defp units(board), do: board ++ transpose(board) ++ boxes(board)

  defp transpose(rows), do: Enum.zip_with(rows, & &1)

  defp boxes(board) do
    board
    |> Enum.chunk_every(3)
    |> Enum.flat_map(fn band ->
      band
      |> Enum.map(&Enum.chunk_every(&1, 3))
      |> transpose()
      |> Enum.map(&List.flatten/1)
    end)
  end

  defp no_duplicates?(unit) do
    filled = Enum.reject(unit, &(&1 == "."))
    length(filled) == MapSet.size(MapSet.new(filled))
  end
end
