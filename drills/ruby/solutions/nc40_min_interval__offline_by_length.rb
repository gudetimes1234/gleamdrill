def min_interval(intervals, queries)
  # Answer each query once, and never revisit it. Taking the intervals
  # shortest first means the first interval to cover a query is already its
  # answer, so every query leaves the pool the moment it is settled and the
  # pool only ever shrinks.
  answers = Array.new(queries.length, -1)
  waiting = queries.each_with_index.map { |query, index| [index, query] }

  intervals.sort_by { |start, finish| finish - start }.each do |start, finish|
    waiting = waiting.reject do |index, query|
      covered = start <= query && query <= finish
      answers[index] = finish - start + 1 if covered
      covered
    end
  end

  answers
end
