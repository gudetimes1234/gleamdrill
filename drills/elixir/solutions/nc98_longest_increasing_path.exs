defmodule Solution do
  def longest_increasing_path([]), do: 0
  def longest_increasing_path([[] | _]), do: 0

  # Strictly increasing means the moves can never form a cycle -- the grid is a
  # directed acyclic graph -- so the longest path from each square is
  # well-defined and can simply be cached. Without that guarantee memoisation
  # would be unsound, which is the fact the problem is really testing.
  def longest_increasing_path(matrix) do
    grid =
      for {row, r} <- Enum.with_index(matrix),
          {value, c} <- Enum.with_index(row),
          into: %{},
          do: {{r, c}, value}

    {best, _memo} =
      Enum.reduce(Map.keys(grid), {0, %{}}, fn at, {best, memo} ->
        {length, memo} = from(at, grid, memo)
        {max(best, length), memo}
      end)

    best
  end

  defp from(at, grid, memo) do
    case Map.fetch(memo, at) do
      {:ok, cached} ->
        {cached, memo}

      :error ->
        here = Map.fetch!(grid, at)

        {best, memo} =
          Enum.reduce(neighbours(at), {1, memo}, fn next, {best, memo} ->
            case Map.get(grid, next) do
              value when is_integer(value) and value > here ->
                {length, memo} = from(next, grid, memo)
                {max(best, length + 1), memo}

              _ ->
                {best, memo}
            end
          end)

        {best, Map.put(memo, at, best)}
    end
  end

  defp neighbours({r, c}), do: [{r - 1, c}, {r + 1, c}, {r, c - 1}, {r, c + 1}]
end
