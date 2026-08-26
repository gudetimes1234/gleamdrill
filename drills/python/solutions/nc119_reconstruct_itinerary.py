def findItinerary(tickets):
    destinations = {}
    for origin, destination in tickets:
        destinations.setdefault(origin, []).append(destination)
    for options in destinations.values():
        options.sort()

    # Hierholzer's algorithm. Take the smallest unused ticket every time and
    # never look back: an airport is only recorded once it has no tickets left,
    # so the dead end the greedy choice walks into is exactly where the route
    # has to *end* -- and being recorded first puts it at the front once the
    # record is reversed.
    route = []
    stack = ["JFK"]
    while stack:
        airport = stack[-1]
        options = destinations.get(airport)
        if options:
            stack.append(options.pop(0))
        else:
            route.append(stack.pop())

    return route[::-1]
