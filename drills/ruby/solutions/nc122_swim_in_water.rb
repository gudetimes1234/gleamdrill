require "set"

def swim_in_water(grid)
  return 0 if grid.empty?

  n = grid.length
  target = [n - 1, n - 1]

  # Dijkstra's, with "cost of a path" redefined from the sum of its steps to
  # the largest step in it: the water only has to rise once. Everything else
  # about the algorithm is unchanged, which is the point: settle the cheapest
  # reachable cell, and the first time the far corner is settled that cost is
  # the answer.
  seen = Set.new
  frontier = [[grid[0][0], 0, 0]]
  until frontier.empty?
    cost, r, c = heap_pop(frontier)
    return cost if [r, c] == target
    next if seen.include?([r, c])

    seen << [r, c]
    [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].each do |nr, nc|
      next unless nr.between?(0, n - 1) && nc.between?(0, grid[nr].length - 1) && !seen.include?([nr, nc])

      heap_push(frontier, [[cost, grid[nr][nc]].max, nr, nc])
    end
  end

  -1
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
