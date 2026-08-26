def networkDelayTime(times, n, k):
    # Bellman-Ford. No choosing what to settle next: relax every edge, n-1
    # times over, and the times settle by themselves -- a shortest path is at
    # most n-1 edges long, and each round fixes at least one more of them.
    # Slower than Dijkstra at O(V*E), and the reason to know it is that it
    # survives negative edge weights, which Dijkstra's settle-and-never-revisit
    # does not.
    settled = {k: 0}
    for _ in range(max(n - 1, 0)):
        for origin, destination, weight in times:
            if origin in settled:
                arrival = settled[origin] + weight
                if destination not in settled or arrival < settled[destination]:
                    settled[destination] = arrival

    return max(settled.values()) if len(settled) == n else -1
