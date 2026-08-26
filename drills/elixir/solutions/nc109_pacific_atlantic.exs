defmodule Solution do
  def pacific_atlantic([]), do: []
  def pacific_atlantic([[] | _]), do: []

  # Search *from* each ocean rather than from each cell. Asking "can this square
  # reach the sea?" means a fresh downhill search per square; asking "which
  # squares can the sea reach?" is two uphill searches in total, and the answer
  # is where they overlap.
  def pacific_atlantic(heights) do
    grid =
      for {row, r} <- Enum.with_index(heights),
          {value, c} <- Enum.with_index(row),
          into: %{},
          do: {{r, c}, value}

    rows = length(heights)
    columns = length(hd(heights))

    pacific =
      Enum.map(0..(columns - 1)//1, &{0, &1}) ++ Enum.map(0..(rows - 1)//1, &{&1, 0})

    atlantic =
      Enum.map(0..(columns - 1)//1, &{rows - 1, &1}) ++
        Enum.map(0..(rows - 1)//1, &{&1, columns - 1})

    grid
    |> uphill(pacific, MapSet.new())
    |> MapSet.intersection(uphill(grid, atlantic, MapSet.new()))
    |> MapSet.to_list()
    |> Enum.sort()
  end

  defp uphill(_grid, [], reached), do: reached

  defp uphill(grid, [at | rest], reached) do
    case Map.fetch(grid, at) do
      :error ->
        uphill(grid, rest, reached)

      {:ok, height} ->
        if MapSet.member?(reached, at) do
          uphill(grid, rest, reached)
        else
          climbable = Enum.filter(neighbours(at), &(Map.get(grid, &1, -1) >= height))
          uphill(grid, rest ++ climbable, MapSet.put(reached, at))
        end
    end
  end

  defp neighbours({r, c}), do: [{r - 1, c}, {r + 1, c}, {r, c - 1}, {r, c + 1}]
end
