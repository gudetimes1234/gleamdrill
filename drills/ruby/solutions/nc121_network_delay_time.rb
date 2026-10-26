def network_delay_time(times, n, k)
  edges = {}
  times.each { |origin, destination, weight| (edges[origin] ||= []) << [destination, weight] }

  # Dijkstra's algorithm. The heap holds tentative arrival times; taking the
  # smallest one settles that node for good, because every other route to it
  # would have to start with an edge at least as long. Stale entries are left
  # in the heap and skipped on the way out, cheaper than finding and
  # rewriting them.
  settled = {}
  frontier = [[0, k]]
  until frontier.empty?
    at, node = heap_pop(frontier)
    next if settled.key?(node)

    settled[node] = at
    edges.fetch(node, []).each do |destination, weight|
      heap_push(frontier, [at + weight, destination]) unless settled.key?(destination)
    end
  end

  # Every node has to have heard the signal, and the answer is the last one to.
  settled.length == n ? settled.values.max : -1
end

# Ruby's standard library has no priority queue, so the heap is written out:
# a binary min-heap kept in a plain array, ordered by <=> (arrays compare
# element by element, so [cost, ...] entries come out cheapest first).
def heap_push(heap, item)
  heap << item
  i = heap.length - 1
  while i.positive?
    parent = (i - 1) / 2
    break if (heap[parent] <=> heap[i]) <= 0

    heap[parent], heap[i] = heap[i], heap[parent]
    i = parent
  end
end

def heap_pop(heap)
  top = heap.first
  last = heap.pop
  return top if heap.empty?

  heap[0] = last
  i = 0
  loop do
    smallest = i
    [2 * i + 1, 2 * i + 2].each do |child|
      smallest = child if child < heap.length && (heap[child] <=> heap[smallest]).negative?
    end
    break if smallest == i

    heap[smallest], heap[i] = heap[i], heap[smallest]
    i = smallest
  end
  top
end
