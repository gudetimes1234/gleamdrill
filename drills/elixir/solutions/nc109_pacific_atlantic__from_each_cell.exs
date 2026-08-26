defmodule Solution do
  def pacific_atlantic([]), do: []
  def pacific_atlantic([[] | _]), do: []

  # The direct reading: from each square, flow downhill and see which edges are
  # reachable. Correct, and it repeats nearly all of its work -- every square on
  # a shared downhill path re-explores the same route. Reversing the question is
  # what removes the repetition.
  def pacific_atlantic(heights) do
    grid =
      for {row, r} <- Enum.with_index(heights),
          {value, c} <- Enum.with_index(row),
          into: %{},
          do: {{r, c}, value}

    rows = length(heights)
    columns = length(hd(heights))

    grid
    |> Map.keys()
    |> Enum.filter(fn at ->
      reached = downhill(grid, [at], MapSet.new())

      Enum.any?(reached, fn {r, c} -> r == 0 or c == 0 end) and
        Enum.any?(reached, fn {r, c} -> r == rows - 1 or c == columns - 1 end)
    end)
    |> Enum.sort()
  end

  defp downhill(_grid, [], reached), do: reached

  defp downhill(grid, [at | rest], reached) do
    case Map.fetch(grid, at) do
      :error ->
        downhill(grid, rest, reached)

      {:ok, height} ->
        if MapSet.member?(reached, at) do
          downhill(grid, rest, reached)
        else
          lower =
            Enum.filter(neighbours(at), fn next ->
              case Map.fetch(grid, next) do
                {:ok, value} -> value <= height
                :error -> false
              end
            end)

          downhill(grid, rest ++ lower, MapSet.put(reached, at))
        end
    end
  end

  defp neighbours({r, c}), do: [{r - 1, c}, {r + 1, c}, {r, c - 1}, {r, c + 1}]
end
