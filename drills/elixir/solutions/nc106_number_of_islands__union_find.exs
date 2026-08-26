defmodule Solution do
  # Union-find instead of flood fill: every square starts as its own island and
  # each adjacency merges two. Only right and down are needed -- every pair of
  # neighbours is reached once that way -- and the answer is how many roots are
  # left. This is the version that keeps working when the grid arrives one
  # square at a time and the count has to be reported after each.
  def num_islands(grid) do
    land =
      for {row, r} <- Enum.with_index(grid),
          {value, c} <- Enum.with_index(row),
          value == "1",
          do: {r, c}

    known = MapSet.new(land)
    parents = Map.new(land, &{&1, &1})

    parents =
      Enum.reduce(land, parents, fn {r, c}, parents ->
        Enum.reduce([{r + 1, c}, {r, c + 1}], parents, fn other, parents ->
          if MapSet.member?(known, other), do: union(parents, {r, c}, other), else: parents
        end)
      end)

    land |> Enum.map(&find(parents, &1)) |> MapSet.new() |> MapSet.size()
  end

  defp find(parents, at) do
    parent = Map.fetch!(parents, at)
    if parent == at, do: at, else: find(parents, parent)
  end

  defp union(parents, a, b) do
    root_a = find(parents, a)
    root_b = find(parents, b)
    if root_a == root_b, do: parents, else: Map.put(parents, root_a, root_b)
  end
end
