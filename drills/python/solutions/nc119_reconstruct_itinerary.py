def findItinerary(tickets):
    destinations = {}  # @1
    for origin, destination in tickets:  # @2
        destinations.setdefault(origin, []).append(destination)  # @2
    for options in destinations.values():  # @3
        options.sort()  # @3

    # Hierholzer's algorithm. Take the smallest unused ticket every time and
    # never look back: an airport is only recorded once it has no tickets left,
    # so the dead end the greedy choice walks into is exactly where the route
    # has to *end* -- and being recorded first puts it at the front once the
    # record is reversed.
    route = []  # @4
    stack = ["JFK"]  # @5
    while stack:  # @6
        airport = stack[-1]  # @7
        options = destinations.get(airport)  # @8
        if options:  # @9
            stack.append(options.pop(0))  # @9
        else:  # @10
            route.append(stack.pop())  # @10

    return route[::-1]  # @11
