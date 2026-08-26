defmodule Solution do
  def network_delay_time(times, n, k) do
    edges =
      Enum.reduce(times, %{}, fn [origin, destination, weight], acc ->
        Map.update(acc, origin, [{destination, weight}], &[{destination, weight} | &1])
      end)

    settled = settle(edges, [{k, 0}], %{})

    # Every node has to have heard the signal, and the answer is the last one to.
    if map_size(settled) == n, do: Enum.max(Map.values(settled)), else: -1
  end

  # Dijkstra's algorithm. The frontier holds tentative arrival times; taking the
  # smallest one settles that node for good, because every other route to it
  # would have to start with an edge at least as long. Erlang has no heap in its
  # standard library, so the smallest is found by a scan -- O(V^2) rather than
  # O(E log V), which is the better shape anyway when the graph is dense.
  defp settle(_edges, [], settled), do: settled

  defp settle(edges, frontier, settled) do
    {node, at} = Enum.min_by(frontier, fn {_node, at} -> at end)
    rest = Enum.reject(frontier, fn {other, _at} -> other == node end)

    if Map.has_key?(settled, node) do
      settle(edges, rest, settled)
    else
      settled = Map.put(settled, node, at)

      reached =
        edges
        |> Map.get(node, [])
        |> Enum.reject(fn {destination, _weight} -> Map.has_key?(settled, destination) end)
        |> Enum.map(fn {destination, weight} -> {destination, at + weight} end)

      settle(edges, rest ++ reached, settled)
    end
  end
end
