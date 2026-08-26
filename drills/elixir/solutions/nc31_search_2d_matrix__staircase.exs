defmodule Solution do
  def search_matrix([], _target), do: false
  def search_matrix([[] | _], _target), do: false

  def search_matrix(matrix, target) do
    width = length(hd(matrix))
    walk(matrix, width, target)
  end

  # From the top-right corner every step is forced: too big and the whole column
  # is too big, so drop it; too small and the whole row is too small, so drop
  # that. O(m + n), and it never uses the fact that rows do not overlap -- it
  # works on any matrix sorted along both axes.
  defp walk([], _column, _target), do: false
  defp walk(_rows, column, _target) when column <= 0, do: false

  defp walk([row | below] = rows, column, target) do
    value = Enum.at(row, column - 1)

    cond do
      value == target -> true
      value > target -> walk(rows, column - 1, target)
      true -> walk(below, column, target)
    end
  end
end
