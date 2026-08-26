defmodule Solution do
  def valid_tree(n, edges) do
    if n <= 0 do
      edges == []
    else
      # Both conditions from one pass. An edge joining two nodes already
      # connected is a cycle, so if none does, the graph is a forest -- and a
      # forest with n-1 merges is a single tree. No adjacency list and no
      # traversal.
      edges
      |> Enum.reduce_while({%{}, 0}, fn [a, b], {parents, merges} ->
        root_a = find(parents, a)
        root_b = find(parents, b)

        if root_a == root_b,
          do: {:halt, :cycle},
          else: {:cont, {Map.put(parents, root_a, root_b), merges + 1}}
      end)
      |> case do
        :cycle -> false
        {_parents, merges} -> merges == n - 1
      end
    end
  end

  defp find(parents, node) do
    case Map.get(parents, node, node) do
      ^node -> node
      parent -> find(parents, parent)
    end
  end
end
