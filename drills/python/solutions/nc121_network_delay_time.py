import heapq


def networkDelayTime(times, n, k):
    edges = {}
    for origin, destination, weight in times:
        edges.setdefault(origin, []).append((destination, weight))

    # Dijkstra's algorithm. The heap holds tentative arrival times; taking the
    # smallest one settles that node for good, because every other route to it
    # would have to start with an edge at least as long. Stale entries are left
    # in the heap and skipped on the way out -- cheaper than finding and
    # rewriting them.
    settled = {}
    frontier = [(0, k)]
    while frontier:
        at, node = heapq.heappop(frontier)
        if node in settled:
            continue
        settled[node] = at
        for destination, weight in edges.get(node, []):
            if destination not in settled:
                heapq.heappush(frontier, (at + weight, destination))

    # Every node has to have heard the signal, and the answer is the last one to.
    return max(settled.values()) if len(settled) == n else -1
