def find_itinerary(tickets)
  destinations = {}
  tickets.each { |origin, destination| (destinations[origin] ||= []) << destination }
  destinations.each_value(&:sort!)

  # Hierholzer's algorithm. Take the smallest unused ticket every time and
  # never look back: an airport is only recorded once it has no tickets left,
  # so the dead end the greedy choice walks into is exactly where the route
  # has to *end*, and being recorded first puts it at the front once the
  # record is reversed.
  route = []
  stack = ["JFK"]
  until stack.empty?
    options = destinations[stack.last]
    if options && !options.empty?
      stack << options.shift
    else
      route << stack.pop
    end
  end

  route.reverse
end
