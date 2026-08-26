defmodule Solution do
  def swim_in_water([]), do: 0

  def swim_in_water(grid) do
    heights =
      for {row, r} <- Enum.with_index(grid),
          {height, c} <- Enum.with_index(row),
          into: %{},
          do: {{r, c}, height}

    # Reachability at time t is monotone: once the corner can be reached it
    # stays reachable as the water rises further. That is exactly the shape
    # binary search needs, so the question turns from "what is the cheapest
    # path" into "is it possible yet", answered by a plain flood fill.
    n = length(grid)
    search(heights, {n - 1, n - 1}, Map.fetch!(heights, {0, 0}), n * n - 1)
  end

  defp search(_heights, _target, low, high) when low >= high, do: low

  defp search(heights, target, low, high) do
    middle = div(low + high, 2)

    if reaches(heights, target, [{0, 0}], MapSet.new(), middle),
      do: search(heights, target, low, middle),
      else: search(heights, target, middle + 1, high)
  end

  defp reaches(_heights, _target, [], _seen, _limit), do: false

  defp reaches(heights, target, [at | rest], seen, limit) do
    # The target has to be passable itself, so its depth is checked before it
    # counts as reached.
    cond do
      MapSet.member?(seen, at) or Map.get(heights, at, limit + 1) > limit ->
        reaches(heights, target, rest, seen, limit)

      at == target ->
        true

      true ->
        reaches(heights, target, rest ++ neighbours(at), MapSet.put(seen, at), limit)
    end
  end

  defp neighbours({r, c}), do: [{r - 1, c}, {r + 1, c}, {r, c - 1}, {r, c + 1}]
end
