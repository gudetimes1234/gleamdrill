def find_cheapest_price(n, flights, src, dst, k)
  outgoing = {}
  flights.each { |origin, destination, price| (outgoing[origin] ||= []) << [destination, price] }

  # Breadth-first by number of flights taken, which makes the stop limit the
  # depth limit: the same bound Bellman-Ford gets from its round count. The
  # cheapest-so-far table is what stops it exploding: a city is only expanded
  # again if this route reached it for less than any earlier one did.
  best = { src => 0 }
  frontier = [[src, 0]]
  (k + 1).times do
    following = []
    frontier.each do |city, spent|
      outgoing.fetch(city, []).each do |destination, price|
        total = spent + price
        next unless !best.key?(destination) || total < best[destination]

        best[destination] = total
        following << [destination, total]
      end
    end
    frontier = following
    break if frontier.empty?
  end

  best.fetch(dst, -1)
end
