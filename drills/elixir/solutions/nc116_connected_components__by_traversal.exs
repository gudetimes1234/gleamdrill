defmodule Solution do
  # One search per unvisited node, exactly as with islands on a grid -- the same
  # counting-components idea with an adjacency list instead of coordinates.
  # Worth seeing side by side with union-find: this one needs the whole graph up
  # front, the other can take edges as they arrive.
  def count_components(n, edges) do
    adjacency =
      Enum.reduce(edges, %{}, fn [a, b], acc ->
        acc |> Map.update(a, [b], &[b | &1]) |> Map.update(b, [a], &[a | &1])
      end)

    {_seen, count} =
      Enum.reduce(0..(n - 1)//1, {MapSet.new(), 0}, fn node, {seen, count} ->
        if MapSet.member?(seen, node),
          do: {seen, count},
          else: {walk([node], adjacency, seen), count + 1}
      end)

    count
  end

  defp walk([], _adjacency, seen), do: seen

  defp walk([node | rest], adjacency, seen) do
    if MapSet.member?(seen, node) do
      walk(rest, adjacency, seen)
    else
      walk(Map.get(adjacency, node, []) ++ rest, adjacency, MapSet.put(seen, node))
    end
  end
end
