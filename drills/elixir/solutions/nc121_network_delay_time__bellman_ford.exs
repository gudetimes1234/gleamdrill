defmodule Solution do
  # Bellman-Ford. No choosing what to settle next: relax every edge, n-1 times
  # over, and the times settle by themselves -- a shortest path is at most n-1
  # edges long, and each round fixes at least one more of them. Slower than
  # Dijkstra at O(V*E), and the reason to know it is that it survives negative
  # edge weights, which Dijkstra's settle-and-never-revisit does not.
  def network_delay_time(times, n, k) do
    settled =
      Enum.reduce(1..(n - 1)//1, %{k => 0}, fn _round, settled ->
        Enum.reduce(times, settled, fn [origin, destination, weight], settled ->
          case Map.fetch(settled, origin) do
            {:ok, at} ->
              arrival = at + weight

              if arrival < Map.get(settled, destination, arrival + 1),
                do: Map.put(settled, destination, arrival),
                else: settled

            :error ->
              settled
          end
        end)
      end)

    if map_size(settled) == n, do: Enum.max(Map.values(settled)), else: -1
  end
end
