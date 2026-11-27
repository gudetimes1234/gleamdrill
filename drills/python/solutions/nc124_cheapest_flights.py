def findCheapestPrice(n, flights, src, dst, k):
    # Bellman-Ford, stopped after k+1 rounds -- one round is one flight, so the
    # round count *is* the stop limit. Each round reads the previous round's
    # costs from a snapshot rather than from the table being written; without
    # that, two flights could be taken within a single round and the limit would
    # leak.
    costs = {src: 0}  # @1
    for _ in range(k + 1):  # @2
        previous = dict(costs)  # @3
        for origin, destination, price in flights:  # @4
            if origin in previous:  # @5
                total = previous[origin] + price  # @6
                if destination not in costs or total < costs[destination]:  # @7
                    costs[destination] = total  # @7

    return costs.get(dst, -1)  # @8
