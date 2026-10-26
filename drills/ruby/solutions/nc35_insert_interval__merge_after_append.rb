def insert(intervals, new_interval)
  # Drop the new interval on the end and run the general merge. Throws away
  # the fact that the input was sorted, O(n log n) rather than O(n), but
  # it reuses a solution you already have rather than a three-way split.
  out = []
  (intervals + [new_interval]).sort.each do |start, finish|
    if !out.empty? && start <= out[-1][1]
      out[-1][1] = [out[-1][1], finish].max
    else
      out << [start, finish]
    end
  end
  out
end
