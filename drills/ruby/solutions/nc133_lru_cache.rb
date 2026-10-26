class LRUCache
  def initialize(capacity)
    # A plain Hash, leaning on the fact that Ruby hashes remember insertion
    # order: deleting a key and putting it back makes it the newest, so the
    # oldest is simply the first key, and `shift` removes it. That is the
    # recency list, free.
    @capacity = capacity
    @entries = {}
  end

  def get(key)
    return -1 unless @entries.key?(key)

    # Reading counts as use, so the key moves to the newest position.
    value = @entries.delete(key)
    @entries[key] = value
    value
  end

  def put(key, value)
    @entries.delete(key)
    @entries[key] = value
    @entries.shift if @entries.size > @capacity
  end
end
