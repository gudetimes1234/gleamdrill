class MinStack
  # Each entry carries the minimum of everything at or below it, so get_min is
  # a peek. One array instead of two, at the cost of storing a second int per
  # value.

  def initialize
    @entries = []
  end

  def push(val)
    current_min = @entries.empty? ? val : [val, @entries.last[1]].min
    @entries << [val, current_min]
  end

  def pop
    @entries.pop
  end

  def top
    @entries.last[0]
  end

  def get_min
    @entries.last[1]
  end
end
