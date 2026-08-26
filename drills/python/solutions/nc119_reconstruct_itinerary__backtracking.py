def findItinerary(tickets):
    destinations = {}
    for origin, destination in tickets:
        destinations.setdefault(origin, []).append(destination)
    for options in destinations.values():
        options.sort()

    # Every ticket used, smallest option first, undoing a choice that leads
    # nowhere. Because the options are sorted, the first complete itinerary
    # found is the smallest one -- no comparing of candidates. Exponential in
    # the worst case, which is what Hierholzer's one-pass walk removes.
    def extend(airport, route, remaining):
        if remaining == 0:
            return route
        options = destinations.get(airport, [])
        for i in range(len(options)):
            next_stop = options.pop(i)
            found = extend(next_stop, route + [next_stop], remaining - 1)
            options.insert(i, next_stop)
            if found is not None:
                return found
        return None

    return extend("JFK", ["JFK"], len(tickets)) or []
