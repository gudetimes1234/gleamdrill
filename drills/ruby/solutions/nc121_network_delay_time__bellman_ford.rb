def network_delay_time(times, n, k)
  # Bellman-Ford. No choosing what to settle next: relax every edge, n-1
  # times over, and the times settle by themselves. A shortest path is at
  # most n-1 edges long, and each round fixes at least one more of them.
  # Slower than Dijkstra at O(V*E), and the reason to know it is that it
  # survives negative edge weights, which Dijkstra's settle-and-never-revisit
  # does not.
  settled = { k => 0 }
  [n - 1, 0].max.times do
    times.each do |origin, destination, weight|
      next unless settled.key?(origin)

      arrival = settled[origin] + weight
      settled[destination] = arrival if !settled.key?(destination) || arrival < settled[destination]
    end
  end

  settled.length == n ? settled.values.max : -1
end
