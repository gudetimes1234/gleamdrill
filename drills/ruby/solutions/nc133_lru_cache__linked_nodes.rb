class LRUCache
  def initialize(capacity)
    # A doubly linked list of keys, newest at the head, plus a map from key
    # to its node. The map makes finding a node O(1) and the back-pointers
    # make unlinking it O(1); neither alone is enough, which is why this is
    # the structure the problem is really about. The head and tail are
    # sentinels, so no link ever has to check for nil.
    @capacity = capacity
    @nodes = {}
    @head = { key: nil, value: nil, prev: nil }
    @tail = { key: nil, value: nil, next: nil }
    @head[:next] = @tail
    @tail[:prev] = @head
  end

  def get(key)
    node = @nodes[key]
    return -1 unless node

    unlink(node)
    push(node)
    node[:value]
  end

  def put(key, value)
    unlink(@nodes.delete(key)) if @nodes.key?(key)
    node = { key: key, value: value, prev: nil, next: nil }
    @nodes[key] = node
    push(node)
    return unless @nodes.size > @capacity

    oldest = @tail[:prev]
    unlink(oldest)
    @nodes.delete(oldest[:key])
  end

  def push(node)
    node[:prev] = @head
    node[:next] = @head[:next]
    @head[:next][:prev] = node
    @head[:next] = node
  end

  def unlink(node)
    node[:prev][:next] = node[:next]
    node[:next][:prev] = node[:prev]
  end
end
