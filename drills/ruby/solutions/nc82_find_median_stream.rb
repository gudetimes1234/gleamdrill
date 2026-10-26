class MedianFinder
  def initialize
    # @lower is the smaller half as a max-heap (negated, since the heap below
    # is a min-heap); @upper is the larger half as a min-heap. The median is
    # always at one or both of those two roots.
    @lower = []
    @upper = []
  end

  def add_num(num)
    heap_push(@lower, -num)
    # The smaller half must not hold anything bigger than the larger half's
    # smallest, and may hold at most one more element than it.
    heap_push(@upper, -heap_pop(@lower))
    heap_push(@lower, -heap_pop(@upper)) if @upper.length > @lower.length
  end

  def find_median
    return 0.0 if @lower.empty?
    return -@lower.first.to_f if @lower.length > @upper.length

    (-@lower.first + @upper.first) / 2.0
  end
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
