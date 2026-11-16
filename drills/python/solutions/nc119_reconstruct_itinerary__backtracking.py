def findItinerary(tickets):
    destinations = {}  # @1
    for origin, destination in tickets:  # @2
        destinations.setdefault(origin, []).append(destination)  # @2
    for options in destinations.values():  # @3
        options.sort()  # @3

    # Every ticket used, smallest option first, undoing a choice that leads
    # nowhere. Because the options are sorted, the first complete itinerary
    # found is the smallest one -- no comparing of candidates. Exponential in
    # the worst case, which is what Hierholzer's one-pass walk removes.
    def extend(airport, route, remaining):
        if remaining == 0:  # @4
            return route  # @4
        options = destinations.get(airport, [])  # @5
        for i in range(len(options)):  # @6
            next_stop = options.pop(i)  # @7
            found = extend(next_stop, route + [next_stop], remaining - 1)  # @8
            options.insert(i, next_stop)  # @9
            if found is not None:  # @10
                return found  # @10
        return None  # @11

    return extend("JFK", ["JFK"], len(tickets)) or []  # @12
