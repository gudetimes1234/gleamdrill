defmodule Solution do
  # Breadth-first instead. For a component's *size* the traversal order does not
  # matter at all -- either visits every square exactly once -- so the choice is
  # about the machine: a queue keeps the memory proportional to the frontier
  # rather than to the deepest path, which is what saves a long thin island from
  # overflowing the stack.
  def max_area_of_island(grid) do
    land =
      for {row, r} <- Enum.with_index(grid),
          {value, c} <- Enum.with_index(row),
          value == 1,
          into: MapSet.new(),
          do: {r, c}

    {best, _seen} =
      Enum.reduce(land, {0, MapSet.new()}, fn at, {best, seen} ->
        if MapSet.member?(seen, at) do
          {best, seen}
        else
          {area, seen} = spread(land, :queue.from_list([at]), seen, 0)
          {max(best, area), seen}
        end
      end)

    best
  end

  defp spread(land, frontier, seen, area) do
    case :queue.out(frontier) do
      {:empty, _} ->
        {area, seen}

      {{:value, at}, rest} ->
        if MapSet.member?(land, at) and not MapSet.member?(seen, at) do
          rest = Enum.reduce(neighbours(at), rest, &:queue.in(&1, &2))
          spread(land, rest, MapSet.put(seen, at), area + 1)
        else
          spread(land, rest, seen, area)
        end
    end
  end

  defp neighbours({r, c}), do: [{r - 1, c}, {r + 1, c}, {r, c - 1}, {r, c + 1}]
end
