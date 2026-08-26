def findCheapestPrice(n, flights, src, dst, k):
    # Bellman-Ford, stopped after k+1 rounds -- one round is one flight, so the
    # round count *is* the stop limit. Each round reads the previous round's
    # costs from a snapshot rather than from the table being written; without
    # that, two flights could be taken within a single round and the limit would
    # leak.
    costs = {src: 0}
    for _ in range(k + 1):
        previous = dict(costs)
        for origin, destination, price in flights:
            if origin in previous:
                total = previous[origin] + price
                if destination not in costs or total < costs[destination]:
                    costs[destination] = total

    return costs.get(dst, -1)
