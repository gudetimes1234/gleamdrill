class KthLargest
  def initialize(k, nums)
    @k = k
    # Only the k largest values can ever be the answer, so a min-heap of
    # size k is enough: the smallest thing in it is the answer, and anything
    # smaller than that is discarded on arrival in O(log k).
    @heap = []
    nums.each { |n| heap_push(@heap, n) }
    heap_pop(@heap) while @heap.length > k
  end

  def add(val)
    heap_push(@heap, val)
    heap_pop(@heap) if @heap.length > @k
    @heap.length == @k ? @heap.first : nil
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
