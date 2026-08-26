defmodule Solution do
  def swim_in_water([]), do: 0

  def swim_in_water(grid) do
    heights =
      for {row, r} <- Enum.with_index(grid),
          {height, c} <- Enum.with_index(row),
          into: %{},
          do: {{r, c}, height}

    n = length(grid)
    cross(heights, {n - 1, n - 1}, [{{0, 0}, Map.fetch!(heights, {0, 0})}], MapSet.new())
  end

  # Dijkstra's, with "cost of a path" redefined from the sum of its steps to the
  # largest step in it -- the water only has to rise once. Everything else about
  # the algorithm is unchanged, which is the point: settle the cheapest
  # reachable cell, and the first time the far corner is settled that cost is
  # the answer.
  defp cross(_heights, _target, [], _seen), do: -1

  defp cross(heights, target, frontier, seen) do
    {at, cost} = Enum.min_by(frontier, fn {_at, cost} -> cost end)
    rest = Enum.reject(frontier, fn {other, _cost} -> other == at end)

    cond do
      at == target ->
        cost

      MapSet.member?(seen, at) ->
        cross(heights, target, rest, seen)

      true ->
        seen = MapSet.put(seen, at)

        reached =
          at
          |> neighbours()
          |> Enum.filter(fn next ->
            not MapSet.member?(seen, next) and Map.has_key?(heights, next)
          end)
          |> Enum.map(fn next -> {next, max(cost, Map.fetch!(heights, next))} end)

        cross(heights, target, rest ++ reached, seen)
    end
  end

  defp neighbours({r, c}), do: [{r - 1, c}, {r + 1, c}, {r, c - 1}, {r, c + 1}]
end
