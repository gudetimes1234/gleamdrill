defmodule Solution do
  # The same component search as counting islands, except each search reports
  # how much it covered rather than just that it happened.
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
          {area, seen} = flood(land, [at], seen, 0)
          {max(best, area), seen}
        end
      end)

    best
  end

  defp flood(_land, [], seen, area), do: {area, seen}

  defp flood(land, [at | rest], seen, area) do
    if MapSet.member?(land, at) and not MapSet.member?(seen, at),
      do: flood(land, neighbours(at) ++ rest, MapSet.put(seen, at), area + 1),
      else: flood(land, rest, seen, area)
  end

  defp neighbours({r, c}), do: [{r - 1, c}, {r + 1, c}, {r, c - 1}, {r, c + 1}]
end
