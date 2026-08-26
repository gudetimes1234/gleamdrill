defmodule Solution do
  @infinity 2_147_483_647

  # One search per empty room, looking for the nearest gate. The answer is the
  # same and the cost is not: every room re-explores the same corridors. Worth
  # writing once to see why starting from the gates instead -- the sources, not
  # the questions -- collapses all of it into a single pass.
  def walls_and_gates(rooms) do
    board =
      for {row, r} <- Enum.with_index(rooms),
          {value, c} <- Enum.with_index(row),
          into: %{},
          do: {{r, c}, value}

    for {row, r} <- Enum.with_index(rooms) do
      for {value, c} <- Enum.with_index(row) do
        if value == @infinity,
          do: nearest_gate(board, [{r, c}], MapSet.new([{r, c}]), 0),
          else: value
      end
    end
  end

  defp nearest_gate(board, frontier, seen, steps) do
    if Enum.any?(frontier, &(Map.get(board, &1) == 0)) do
      steps
    else
      next =
        frontier
        |> Enum.flat_map(&neighbours/1)
        |> Enum.filter(fn at ->
          not MapSet.member?(seen, at) and Map.get(board, at, -1) != -1
        end)
        |> Enum.uniq()

      if next == [],
        do: @infinity,
        else: nearest_gate(board, next, MapSet.union(seen, MapSet.new(next)), steps + 1)
    end
  end

  defp neighbours({r, c}), do: [{r - 1, c}, {r + 1, c}, {r, c - 1}, {r, c + 1}]
end
