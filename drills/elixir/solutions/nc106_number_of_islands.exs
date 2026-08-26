defmodule Solution do
  # Counting connected components: start a search at every piece of land not
  # already reached, and each search that has to be started is one more island.
  # Marking as you go is what stops a component being counted once per square.
  def num_islands(grid) do
    land =
      for {row, r} <- Enum.with_index(grid),
          {value, c} <- Enum.with_index(row),
          value == "1",
          into: MapSet.new(),
          do: {r, c}

    {count, _seen} =
      Enum.reduce(land, {0, MapSet.new()}, fn at, {count, seen} ->
        if MapSet.member?(seen, at),
          do: {count, seen},
          else: {count + 1, flood(land, [at], seen)}
      end)

    count
  end

  defp flood(_land, [], seen), do: seen

  defp flood(land, [at | rest], seen) do
    if MapSet.member?(land, at) and not MapSet.member?(seen, at),
      do: flood(land, neighbours(at) ++ rest, MapSet.put(seen, at)),
      else: flood(land, rest, seen)
  end

  defp neighbours({r, c}), do: [{r - 1, c}, {r + 1, c}, {r, c - 1}, {r, c + 1}]
end
