defmodule Solution do
  # Try removing each edge, latest first, and keep the first removal that leaves
  # a tree. O(n^2) against union-find's near-linear, but it needs no new
  # structure -- and it says the specification outright: the answer is the last
  # edge whose absence would make the graph a tree.
  def find_redundant_connection(edges) do
    nodes = edges |> List.flatten() |> MapSet.new()
    indexed = Enum.with_index(edges)

    indexed
    |> Enum.reverse()
    |> Enum.find_value([], fn {edge, i} ->
      remaining = for {other, j} <- indexed, j != i, do: other
      if tree?(remaining, nodes), do: edge, else: nil
    end)
  end

  defp tree?(edges, nodes) do
    cond do
      MapSet.size(nodes) == 0 ->
        true

      length(edges) != MapSet.size(nodes) - 1 ->
        false

      true ->
        adjacency =
          Enum.reduce(edges, %{}, fn [a, b], acc ->
            acc |> Map.update(a, [b], &[b | &1]) |> Map.update(b, [a], &[a | &1])
          end)

        seen = walk([Enum.min(nodes)], adjacency, MapSet.new())
        MapSet.size(seen) == MapSet.size(nodes)
    end
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
