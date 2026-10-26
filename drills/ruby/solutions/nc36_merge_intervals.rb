def merge(intervals)
  # Sorted by start, an interval can only ever overlap the one being built, so
  # a single pass is enough: extend it, or begin a new one.
  out = []
  intervals.sort.each do |start, finish|
    if !out.empty? && start <= out[-1][1]
      out[-1][1] = [out[-1][1], finish].max
    else
      out << [start, finish]
    end
  end
  out
end
