def find_itinerary(tickets)
  destinations = {}
  tickets.each { |origin, destination| (destinations[origin] ||= []) << destination }
  destinations.each_value(&:sort!)

  # Every ticket used, smallest option first, undoing a choice that leads
  # nowhere. Because the options are sorted, the first complete itinerary
  # found is the smallest one, with no comparing of candidates. Exponential in
  # the worst case, which is what Hierholzer's one-pass walk removes.
  walk = lambda do |airport, route, remaining|
    return route if remaining.zero?

    options = destinations.fetch(airport, [])
    options.length.times do |i|
      stop = options.delete_at(i)
      found = walk.call(stop, route + [stop], remaining - 1)
      options.insert(i, stop)
      return found if found
    end
    nil
  end

  walk.call("JFK", ["JFK"], tickets.length) || []
end
