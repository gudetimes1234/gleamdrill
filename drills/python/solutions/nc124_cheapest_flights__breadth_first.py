def findCheapestPrice(n, flights, src, dst, k):
    outgoing = {}  # @1
    for origin, destination, price in flights:  # @2
        outgoing.setdefault(origin, []).append((destination, price))  # @2

    # Breadth-first by number of flights taken, which makes the stop limit the
    # depth limit -- the same bound Bellman-Ford gets from its round count. The
    # cheapest-so-far table is what stops it exploding: a city is only expanded
    # again if this route reached it for less than any earlier one did.
    best = {src: 0}  # @3
    frontier = [(src, 0)]  # @4
    for _ in range(k + 1):  # @5
        following = []  # @6
        for city, spent in frontier:  # @7
            for destination, price in outgoing.get(city, []):  # @8
                total = spent + price  # @9
                if destination not in best or total < best[destination]:  # @10
                    best[destination] = total  # @11
                    following.append((destination, total))  # @11
        frontier = following  # @12
        if not frontier:  # @13
            break  # @13

    return best.get(dst, -1)  # @14
