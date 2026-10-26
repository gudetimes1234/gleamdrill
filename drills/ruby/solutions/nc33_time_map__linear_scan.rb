class TimeMap
  def initialize
    @store = Hash.new { |hash, key| hash[key] = [] }
  end

  def set(key, value, timestamp)
    @store[key].unshift([timestamp, value])
  end

  def get(key, timestamp)
    # Newest first, so the first entry old enough is the answer. O(n) per
    # lookup against the halving version's O(log n), but there is no split
    # arithmetic to get wrong.
    found = @store.fetch(key, []).find { |stamp, _value| stamp <= timestamp }
    found ? found[1] : ""
  end
end
