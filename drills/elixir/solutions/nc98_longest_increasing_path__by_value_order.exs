defmodule Solution do
  def longest_increasing_path([]), do: 0
  def longest_increasing_path([[] | _]), do: 0

  # The same acyclicity used the other way round: process the squares from
  # largest value to smallest, and by the time a square is reached every square
  # it can move to has already been settled. A topological order without ever
  # building the graph -- sorting by value *is* the order.
  def longest_increasing_path(matrix) do
    cells =
      for {row, r} <- Enum.with_index(matrix),
          {value, c} <- Enum.with_index(row),
          do: {{r, c}, value}

    grid = Map.new(cells)

    lengths =
      cells
      |> Enum.sort_by(fn {_at, value} -> value end, :desc)
      |> Enum.reduce(%{}, fn {at, here}, lengths ->
        best =
          Enum.reduce(neighbours(at), 1, fn next, best ->
            case Map.get(grid, next) do
              value when is_integer(value) and value > here ->
                max(best, Map.get(lengths, next, 1) + 1)

              _ ->
                best
            end
          end)

        Map.put(lengths, at, best)
      end)

    lengths |> Map.values() |> Enum.max()
  end

  defp neighbours({r, c}), do: [{r - 1, c}, {r + 1, c}, {r, c - 1}, {r, c + 1}]
end
