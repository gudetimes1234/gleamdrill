def findCheapestPrice(n, flights, src, dst, k):
    outgoing = {}
    for origin, destination, price in flights:
        outgoing.setdefault(origin, []).append((destination, price))

    # Breadth-first by number of flights taken, which makes the stop limit the
    # depth limit -- the same bound Bellman-Ford gets from its round count. The
    # cheapest-so-far table is what stops it exploding: a city is only expanded
    # again if this route reached it for less than any earlier one did.
    best = {src: 0}
    frontier = [(src, 0)]
    for _ in range(k + 1):
        following = []
        for city, spent in frontier:
            for destination, price in outgoing.get(city, []):
                total = spent + price
                if destination not in best or total < best[destination]:
                    best[destination] = total
                    following.append((destination, total))
        frontier = following
        if not frontier:
            break

    return best.get(dst, -1)
