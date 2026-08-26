defmodule Solution do
  def valid_tree(n, edges) do
    cond do
      # A graph with no nodes at all is vacuously a tree, provided it has no
      # edges either -- worth stating, because the n-1 edge count says otherwise.
      n <= 0 ->
        edges == []

      # A tree is two conditions at once: connected, and no cycles. Checking both
      # separately is unnecessary -- with exactly n-1 edges, connected implies
      # acyclic and acyclic implies connected, so testing the edge count plus
      # either one is enough. Here it is the count plus reachability.
      length(edges) != n - 1 ->
        false

      true ->
        adjacency =
          Enum.reduce(edges, %{}, fn [a, b], acc ->
            acc |> Map.update(a, [b], &[b | &1]) |> Map.update(b, [a], &[a | &1])
          end)

        MapSet.size(walk([0], adjacency, MapSet.new())) == n
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
