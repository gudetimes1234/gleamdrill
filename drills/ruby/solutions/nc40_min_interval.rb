def min_interval(intervals, queries)
  queries.map do |query|
    lengths = intervals.filter_map { |start, finish| finish - start + 1 if start <= query && query <= finish }
    lengths.empty? ? -1 : lengths.min
  end
end
