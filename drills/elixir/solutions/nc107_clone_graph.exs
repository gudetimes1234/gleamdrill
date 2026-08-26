defmodule Solution do
  def clone_graph(_adjacency, start) when start < 0, do: []

  def clone_graph(adjacency, start) do
    if start >= length(adjacency) do
      []
    else
      graph = adjacency |> Enum.with_index() |> Map.new(fn {edges, i} -> {i, edges} end)

      # The set of nodes already dealt with is the whole problem. Without it a
      # cycle sends the traversal round forever; with it, a node already reached
      # is simply skipped. Only the component containing the start is copied,
      # which is what the reachable set also decides.
      renumber(graph, discover(graph, [start], MapSet.new()))
    end
  end

  defp discover(_graph, [], reached), do: reached

  defp discover(graph, [node | rest], reached) do
    if MapSet.member?(reached, node) or not Map.has_key?(graph, node) do
      discover(graph, rest, reached)
    else
      discover(graph, rest ++ Map.fetch!(graph, node), MapSet.put(reached, node))
    end
  end

  # Reachable nodes renumbered by their original index, ascending. Numbering by
  # *discovery* order would make the answer depend on whether the traversal was
  # breadth- or depth-first, which is not part of the problem.
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
