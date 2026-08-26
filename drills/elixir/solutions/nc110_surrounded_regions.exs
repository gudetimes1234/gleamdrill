defmodule Solution do
  def solve([]), do: []
  def solve([[] | _] = board), do: board

  # Invert the question. "Which regions are surrounded?" needs a search per
  # region and a rule for what counts as escaping; "which regions touch an
  # edge?" is one search from the border, and everything it does not reach is
  # surrounded by definition.
  def solve(board) do
    rows = length(board)
    columns = length(hd(board))

    open =
      for {row, r} <- Enum.with_index(board),
          {value, c} <- Enum.with_index(row),
          value == "O",
          into: MapSet.new(),
          do: {r, c}

    border =
      Enum.filter(open, fn {r, c} ->
        r == 0 or c == 0 or r == rows - 1 or c == columns - 1
      end)

    safe = Enum.reduce(border, MapSet.new(), &flood(open, [&1], &2))

    for {row, r} <- Enum.with_index(board) do
      for {value, c} <- Enum.with_index(row) do
        if value == "O" and not MapSet.member?(safe, {r, c}), do: "X", else: value
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
