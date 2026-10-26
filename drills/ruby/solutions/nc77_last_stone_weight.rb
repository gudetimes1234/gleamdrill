def last_stone_weight(stones)
  # Always the two heaviest, so the collection has to give up its maximum over
  # and over, which is exactly what a heap is for. This heap is a min-heap, so
  # the values go in negated and come back out the same way.
  heap = []
  stones.each { |stone| heap_push(heap, -stone) }

  while heap.length > 1
    heaviest = -heap_pop(heap)
    following = -heap_pop(heap)
    heap_push(heap, -(heaviest - following)) if heaviest != following
  end

  heap.empty? ? 0 : -heap.first
end

# Ruby's standard library has no heap, so here is one: an array kept as a
# binary min-heap, the smallest always at index 0. A push sifts the new item
# up past bigger parents; a pop moves the last item to the root and sifts it
# down past smaller children. Both are O(log n).
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

    heap[i], heap[smallest] = heap[smallest], heap[i]
    i = smallest
  end
  top
end
