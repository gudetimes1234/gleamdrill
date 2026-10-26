def find_cheapest_price(n, flights, src, dst, k)
  # Bellman-Ford, stopped after k+1 rounds: one round is one flight, so the
  # round count *is* the stop limit. Each round reads the previous round's
  # costs from a snapshot rather than from the table being written; without
  # that, two flights could be taken within a single round and the limit would
  # leak.
  costs = { src => 0 }
  (k + 1).times do
    previous = costs.dup
    flights.each do |origin, destination, price|
      next unless previous.key?(origin)

      total = previous[origin] + price
      costs[destination] = total if !costs.key?(destination) || total < costs[destination]
    end
  end

  costs.fetch(dst, -1)
end
