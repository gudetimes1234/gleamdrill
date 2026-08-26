defmodule Solution do
  def solve([]), do: []
  def solve([[] | _] = board), do: board

  # The direct reading: find each region, then decide whether it escapes. It
  # works, and it needs a second idea the border search does not -- the whole
  # region has to be collected before any verdict can be given, so the search
  # cannot stop early and the escape test is over the component rather than a
  # single square.
  def solve(board) do
    rows = length(board)
    columns = length(hd(board))

    open =
      for {row, r} <- Enum.with_index(board),
          {value, c} <- Enum.with_index(row),
          value == "O",
          into: MapSet.new(),
          do: {r, c}

    {doomed, _seen} =
      Enum.reduce(open, {MapSet.new(), MapSet.new()}, fn at, {doomed, seen} ->
        if MapSet.member?(seen, at) do
          {doomed, seen}
        else
          region = flood(open, [at], MapSet.new())

          escapes =
            Enum.any?(region, fn {r, c} ->
              r == 0 or c == 0 or r == rows - 1 or c == columns - 1
            end)

          {if(escapes, do: doomed, else: MapSet.union(doomed, region)),
           MapSet.union(seen, region)}
        end
      end)

    for {row, r} <- Enum.with_index(board) do
      for {value, c} <- Enum.with_index(row) do
        if MapSet.member?(doomed, {r, c}), do: "X", else: value
      end
    end
  end

  defp flood(_open, [], seen), do: seen

  defp flood(open, [at | rest], seen) do
    if MapSet.member?(open, at) and not MapSet.member?(seen, at),
      do: flood(open, neighbours(at) ++ rest, MapSet.put(seen, at)),
      else: flood(open, rest, seen)
  end

  defp neighbours({r, c}), do: [{r - 1, c}, {r + 1, c}, {r, c - 1}, {r, c + 1}]
end
