def networkDelayTime(times, n, k):
    # Bellman-Ford. No choosing what to settle next: relax every edge, n-1
    # times over, and the times settle by themselves -- a shortest path is at
    # most n-1 edges long, and each round fixes at least one more of them.
    # Slower than Dijkstra at O(V*E), and the reason to know it is that it
    # survives negative edge weights, which Dijkstra's settle-and-never-revisit
    # does not.
    settled = {k: 0}  # @1
    for _ in range(max(n - 1, 0)):  # @2
        for origin, destination, weight in times:  # @3
            if origin in settled:  # @4
                arrival = settled[origin] + weight  # @5
                if destination not in settled or arrival < settled[destination]:  # @6
                    settled[destination] = arrival  # @6

    return max(settled.values()) if len(settled) == n else -1  # @7
