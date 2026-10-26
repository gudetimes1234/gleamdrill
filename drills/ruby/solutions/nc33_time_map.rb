class TimeMap
  def initialize
    @store = Hash.new { |hash, key| hash[key] = [] }
  end

  def set(key, value, timestamp)
    # Timestamps only ever increase, so appending keeps each key's history
    # sorted for free.
    @store[key] << [timestamp, value]
  end

  def get(key, timestamp)
    # The history is sorted, so the newest entry at or before a timestamp is
    # a halving question, not a walk.
    history = @store.fetch(key, [])
    low = 0
    high = history.length - 1
    best = ""
    while low <= high
      mid = (low + high) / 2
      if history[mid][0] <= timestamp
        best = history[mid][1]
        low = mid + 1
      else
        high = mid - 1
      end
    end
    best
  end
end
