defmodule Solution do
  # Kruskal's algorithm: every edge, cheapest first, kept only when it joins two
  # pieces that are not already connected. Union-find is what makes that test
  # cheap. The trade against Prim's is the sort -- O(n^2 log n) edges here
  # against Prim's O(n^2) -- but Kruskal never needs the points themselves, only
  # the edge list, so it is the one that generalises to a sparse graph.
  def min_cost_connect_points(points) do
    indexed = Enum.with_index(points)

    edges =
      for {a, i} <- indexed, {b, j} <- indexed, i < j do
        {distance(a, b), i, j}
      end
      |> Enum.sort()

    {_parents, total} =
      Enum.reduce(edges, {%{}, 0}, fn {cost, i, j}, {parents, total} ->
        root_i = find(parents, i)
        root_j = find(parents, j)

        if root_i == root_j,
          do: {parents, total},
          else: {Map.put(parents, root_i, root_j), total + cost}
      end)

    total
  end

  defp find(parents, node) do
    case Map.get(parents, node, node) do
      ^node -> node
      parent -> find(parents, parent)
    end
  end

  defp distance([ax, ay], [bx, by]), do: abs(ax - bx) + abs(ay - by)
end
