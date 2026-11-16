import heapq


def networkDelayTime(times, n, k):
    edges = {}  # @1
    for origin, destination, weight in times:  # @2
        edges.setdefault(origin, []).append((destination, weight))  # @2

    # Dijkstra's algorithm. The heap holds tentative arrival times; taking the
    # smallest one settles that node for good, because every other route to it
    # would have to start with an edge at least as long. Stale entries are left
    # in the heap and skipped on the way out -- cheaper than finding and
    # rewriting them.
    settled = {}  # @3
    frontier = [(0, k)]  # @4
    while frontier:  # @5
        at, node = heapq.heappop(frontier)  # @6
        if node in settled:  # @7
            continue  # @7
        settled[node] = at  # @8
        for destination, weight in edges.get(node, []):  # @9
            if destination not in settled:  # @10
                heapq.heappush(frontier, (at + weight, destination))  # @10

    # Every node has to have heard the signal, and the answer is the last one to.
    return max(settled.values()) if len(settled) == n else -1  # @11
