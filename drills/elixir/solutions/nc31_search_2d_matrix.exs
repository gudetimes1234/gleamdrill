defmodule Solution do
  def search_matrix(matrix, target) do
    case find_row(List.to_tuple(matrix), target, 0, length(matrix) - 1) do
      nil -> false
      row -> contains?(List.to_tuple(row), target, 0, length(row) - 1)
    end
  end

  # The rows are sorted and do not overlap, so the row a value could live in is
  # itself found by halving: compare the target against a row's ends.
  defp find_row(_rows, _target, low, high) when low > high, do: nil

  defp find_row(rows, target, low, high) do
    mid = div(low + high, 2)
    row = elem(rows, mid)

    cond do
      List.last(row) < target -> find_row(rows, target, mid + 1, high)
      hd(row) > target -> find_row(rows, target, low, mid - 1)
      true -> row
    end
  end

  defp contains?(_row, _target, low, high) when low > high, do: false

  defp contains?(row, target, low, high) do
    mid = div(low + high, 2)

    cond do
      elem(row, mid) == target -> true
      elem(row, mid) < target -> contains?(row, target, mid + 1, high)
      true -> contains?(row, target, low, mid - 1)
    end
  end
end
