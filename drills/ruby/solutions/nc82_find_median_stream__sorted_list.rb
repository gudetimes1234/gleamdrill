class MedianFinder
  def initialize
    @values = []
  end

  # One sorted list, kept in order on insertion. Simpler to believe than two
  # halves, and the median is then just a lookup, at the cost of an O(n)
  # insert where the two-heap version pays O(log n).
  def add_num(num)
    at = @values.bsearch_index { |value| value > num } || @values.length
    @values.insert(at, num)
  end

  def find_median
    n = @values.length
    return 0.0 if n.zero?

    (@values[n / 2] + @values[(n - 1) / 2]) / 2.0
  end
end
