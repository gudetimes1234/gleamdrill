defmodule Solution do
  def oranges_rotting(grid) do
    board =
      for {row, r} <- Enum.with_index(grid),
          {value, c} <- Enum.with_index(row),
          into: %{},
          do: {{r, c}, value}

    tick(board, 0)
  end

  # Rewrite the whole grid once per minute rather than tracking a frontier. Much
  # more work -- every square is examined every minute, not just the ones next
  # to the rot -- but it is the problem statement executed literally, and it
  # makes plain that the answer counts *rounds*, not distances.
  defp tick(board, minutes) do
    next =
      Map.new(board, fn {at, value} ->
        if value == 1 and Enum.any?(neighbours(at), &(Map.get(board, &1) == 2)),
          do: {at, 2},
          else: {at, value}
      end)

    cond do
      next != board -> tick(next, minutes + 1)
      # Nothing changed: either everything has rotted or what is left never will.
      Enum.any?(Map.values(board), &(&1 == 1)) -> -1
      true -> minutes
    end
  end

  defp neighbours({r, c}), do: [{r - 1, c}, {r + 1, c}, {r, c - 1}, {r, c + 1}]
end
