defmodule Solution do
  def solve_n_queens(n) do
    n
    |> place(0, [], MapSet.new(), MapSet.new(), MapSet.new())
    |> Enum.map(fn chosen -> render(Enum.reverse(chosen), n) end)
  end

  # One queen per row, so the only choice is which column. A diagonal is
  # identified by row - column and an anti-diagonal by row + column, which turns
  # "is this square attacked?" into three set lookups -- and lets the search
  # abandon a whole subtree the moment one fails.
  defp place(n, row, chosen, _columns, _diagonals, _anti) when row >= n, do: [chosen]

  defp place(n, row, chosen, columns, diagonals, anti) do
    for column <- 0..(n - 1)//1,
        not MapSet.member?(columns, column),
        not MapSet.member?(diagonals, row - column),
        not MapSet.member?(anti, row + column),
        result <-
          place(
            n,
            row + 1,
            [column | chosen],
            MapSet.put(columns, column),
            MapSet.put(diagonals, row - column),
            MapSet.put(anti, row + column)
          ),
        do: result
  end

  defp render(chosen, n) do
    Enum.map(chosen, fn column ->
      String.duplicate(".", column) <> "Q" <> String.duplicate(".", n - column - 1)
    end)
  end
end
