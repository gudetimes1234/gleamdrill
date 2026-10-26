def merge_k_lists(lists)
  # Take the smallest head across all the lists, over and over: the heap is
  # what makes "smallest of k" cost O(log k) instead of a scan of k. Ruby has
  # no priority queue in its core library, so the heap is written out below.
  # Each entry is [value, list index, node], and the index is the tie-break:
  # two equal values are settled by it, so the nodes themselves, which have
  # no ordering, are never compared.
  frontier = []
  lists.each_with_index { |head, i| heap_push(frontier, [head.val, i, head]) if head }

  dummy = ListNode.new
  tail = dummy
  until frontier.empty?
    _value, i, node = heap_pop(frontier)
    tail.next = node
    tail = node
    heap_push(frontier, [node.next.val, i, node.next]) if node.next
  end

  tail.next = nil
  dummy.next
end

def before?(a, b)
  a[0] < b[0] || (a[0] == b[0] && a[1] < b[1])
end

def heap_push(heap, entry)
  heap << entry
  child = heap.length - 1
  while child > 0
    parent = (child - 1) / 2
    break unless before?(heap[child], heap[parent])

    heap[child], heap[parent] = heap[parent], heap[child]
    child = parent
  end
end

def heap_pop(heap)
  top = heap[0]
  last = heap.pop
  return top if heap.empty?

  heap[0] = last
  parent = 0
  loop do
    smallest = parent
    [2 * parent + 1, 2 * parent + 2].each do |child|
      smallest = child if child < heap.length && before?(heap[child], heap[smallest])
    end
    break if smallest == parent

    heap[parent], heap[smallest] = heap[smallest], heap[parent]
    parent = smallest
  end
  top
end
