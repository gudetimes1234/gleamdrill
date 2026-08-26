defmodule Solution do
  @infinity 2_147_483_647

  # One breadth-first search starting from *all* the gates at once, rather than
  # one search per empty room. Because every source begins at distance zero
  # together, the first time a room is reached is by its nearest gate -- the
  # multi-source search does the whole grid in one pass.
  def walls_and_gates(rooms) do
    board =
      for {row, r} <- Enum.with_index(rooms),
          {value, c} <- Enum.with_index(row),
          into: %{},
          do: {{r, c}, value}

    gates = for {at, 0} <- board, do: at
    distances = spread(board, gates, Map.new(gates, &{&1, 0}), 1)

    for {row, r} <- Enum.with_index(rooms) do
      for {value, c} <- Enum.with_index(row) do
        if value == @infinity, do: Map.get(distances, {r, c}, @infinity), else: value
      end
    end
  end

  defp spread(board, frontier, distances, steps) do
    next =
      frontier
      |> Enum.flat_map(&neighbours/1)
      |> Enum.filter(&(Map.get(board, &1) == @infinity and not Map.has_key?(distances, &1)))
      |> Enum.uniq()

    if next == [] do
      distances
    else
      spread(board, next, Enum.reduce(next, distances, &Map.put(&2, &1, steps)), steps + 1)
    end
  end

  defp neighbours({r, c}), do: [{r - 1, c}, {r + 1, c}, {r, c - 1}, {r, c + 1}]
end
