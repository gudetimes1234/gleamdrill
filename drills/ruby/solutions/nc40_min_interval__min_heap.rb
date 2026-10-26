def min_interval(intervals, queries)
  # The O((n + q) log n) answer. Walk the queries in time order, letting in
  # every interval that has started by now, and keep the live ones in a heap
  # by length. The shortest one on top is the answer once anything that has
  # already ended is discarded, and an interval only ever ends once, so the
  # discarding is amortised free.
  ordered = intervals.sort
  answers = {}
  heap = []
  i = 0

  queries.sort.each do |query|
    while i < ordered.length && ordered[i][0] <= query
      start, finish = ordered[i]
      heap_push(heap, [finish - start + 1, finish])
      i += 1
    end
    heap_pop(heap) while !heap.empty? && heap[0][1] < query
    answers[query] = heap.empty? ? -1 : heap[0][0]
  end

  queries.map { |query| answers[query] }
end

# Ruby has no heap in its core library, so here is a binary min-heap on a
# plain array: the parent of index i sits at (i - 1) / 2.
def heap_push(heap, item)
  heap << item
  i = heap.length - 1
  while i > 0
    parent = (i - 1) / 2
    break if (heap[parent] <=> heap[i]) <= 0

    heap[parent], heap[i] = heap[i], heap[parent]
    i = parent
  end
end

def heap_pop(heap)
  top = heap[0]
  last = heap.pop
  return top if heap.empty?

  heap[0] = last
  i = 0
  loop do
    smallest = i
    [2 * i + 1, 2 * i + 2].each do |child|
      smallest = child if child < heap.length && (heap[child] <=> heap[smallest]) < 0
    end
    break if smallest == i

    heap[smallest], heap[i] = heap[i], heap[smallest]
    i = smallest
  end
  top
end
