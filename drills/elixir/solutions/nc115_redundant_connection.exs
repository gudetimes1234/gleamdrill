defmodule Solution do
  # n nodes and n edges means exactly one cycle. Union-find spots it the moment
  # an edge joins two nodes already connected -- and because the edges are
  # processed in order, the first such edge is the last one that could be
  # removed, which is what the problem asks for.
  def find_redundant_connection(edges) do
    edges
    |> Enum.reduce({%{}, []}, fn [a, b], {parents, found} ->
      root_a = find(parents, a)
      root_b = find(parents, b)

      if root_a == root_b,
        do: {parents, [a, b]},
        else: {Map.put(parents, root_a, root_b), found}
    end)
    |> elem(1)
  end

  defp find(parents, node) do
    case Map.get(parents, node, node) do
      ^node -> node
      parent -> find(parents, parent)
    end
  end
end
