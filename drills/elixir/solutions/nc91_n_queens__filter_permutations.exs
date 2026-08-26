defmodule Solution do
  # One queen per row with no two sharing a column *is* a permutation of the
  # columns, so the row and column rules are satisfied by construction and only
  # the diagonals are left to test. Generating all n! and filtering is far
  # slower than pruning as you go -- it explores arrangements a backtracker
  # would have abandoned at the second queen -- but it names what the search
  # space actually is.
  def solve_n_queens(n) do
    0..(n - 1)//1
    |> Enum.to_list()
    |> permutations()
    |> Enum.filter(&no_diagonal_clash?/1)
    |> Enum.map(&render(&1, n))
  end

  defp permutations([]), do: [[]]

  defp permutations(values) do
    for {value, i} <- Enum.with_index(values),
        tail <- permutations(List.delete_at(values, i)),
        do: [value | tail]
  end

  defp no_diagonal_clash?(chosen) do
    placed = Enum.with_index(chosen)

    Enum.all?(placed, fn {column_a, row_a} ->
      Enum.all?(placed, fn {column_b, row_b} ->
        row_a == row_b or abs(row_a - row_b) != abs(column_a - column_b)
      end)
    end)
  end

  defp render(chosen, n) do
    Enum.map(chosen, fn column ->
      String.duplicate(".", column) <> "Q" <> String.duplicate(".", n - column - 1)
    end)
  end
end
