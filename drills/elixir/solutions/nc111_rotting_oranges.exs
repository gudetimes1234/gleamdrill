defmodule Solution do
  # Breadth-first from *every* rotten orange at once, which is what makes the
  # level count a time: all the sources start at minute zero together, so each
  # wave of the search is one minute. A separate search per source would give
  # distances from each, and then need combining.
  def oranges_rotting(grid) do
    board =
      for {row, r} <- Enum.with_index(grid),
          {value, c} <- Enum.with_index(row),
          into: %{},
          do: {{r, c}, value}

    rotten = for {at, 2} <- board, do: at
    fresh = for {at, 1} <- board, into: MapSet.new(), do: at

    {minutes, reached} = spread(board, rotten, MapSet.new(rotten), 0)

    if MapSet.size(MapSet.difference(fresh, reached)) == 0, do: minutes, else: -1
  end

  defp spread(board, frontier, reached, minutes) do
    next =
      frontier
      |> Enum.flat_map(&neighbours/1)
      |> Enum.filter(&(Map.get(board, &1) == 1 and not MapSet.member?(reached, &1)))
      |> Enum.uniq()

    if next == [] do
      {minutes, reached}
    else
      spread(board, next, MapSet.union(reached, MapSet.new(next)), minutes + 1)
    end
  end

  defp neighbours({r, c}), do: [{r - 1, c}, {r + 1, c}, {r, c - 1}, {r, c + 1}]
end
