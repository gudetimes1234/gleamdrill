defmodule Solution do
  def clone_graph(_adjacency, start) when start < 0, do: []

  def clone_graph(adjacency, start) do
    if start >= length(adjacency) do
      []
    else
      graph = adjacency |> Enum.with_index() |> Map.new(fn {edges, i} -> {i, edges} end)
      renumber(graph, visit(graph, start, MapSet.new()))
    end
  end

  # Depth-first. The node is marked *before* recursing into its neighbours,
  # which is what makes a cycle terminate -- marking afterwards would let the
  # traversal reach the same node again while it was still being visited.
  defp visit(graph, node, reached) do
    if MapSet.member?(reached, node) or not Map.has_key?(graph, node) do
      reached
    else
      graph
      |> Map.fetch!(node)
      |> Enum.reduce(MapSet.put(reached, node), &visit(graph, &1, &2))
    end
  end

  defp renumber(graph, reached) do
    ordered = reached |> MapSet.to_list() |> Enum.sort()
    numbering = ordered |> Enum.with_index() |> Map.new()

    Enum.map(ordered, fn node ->
      graph
      |> Map.fetch!(node)
      |> Enum.filter(&Map.has_key?(numbering, &1))
      |> Enum.map(&Map.fetch!(numbering, &1))
    end)
  end
end
