def partition(s)
  build(s)
end

# Every partition starts with some palindromic prefix, so the choice at each
# step is only how long that prefix is. Cutting there and recursing on the rest
# reaches each partition exactly once, in order, with nothing to dedupe.
def build(remaining)
  return [[]] if remaining.empty?

  (1..remaining.length).flat_map do |size|
    prefix = remaining[0, size]
    next [] unless prefix == prefix.reverse

    build(remaining[size..]).map { |rest| [prefix] + rest }
  end
end
