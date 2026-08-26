defmodule Solution do
  # Start with n components and merge: every edge whose ends are not already
  # together removes one. No traversal, no adjacency list -- the count falls
  # straight out of how many merges actually happened.
  def count_components(n, edges) do
    {_parents, merges} =
      Enum.reduce(edges, {%{}, 0}, fn [a, b], {parents, merges} ->
        root_a = find(parents, a)
        root_b = find(parents, b)

        if root_a == root_b,
          do: {parents, merges},
          else: {Map.put(parents, root_a, root_b), merges + 1}
      end)

    n - merges
  end

  defp find(parents, node) do
    case Map.get(parents, node, node) do
      ^node -> node
      parent -> find(parents, parent)
    end
  end
end
