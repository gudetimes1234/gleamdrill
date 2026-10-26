def reorder_list(head)
  # Collect the nodes into an array first, then relink them by index from both
  # ends. O(n) extra space against the in-place version's O(1), but random
  # access is exactly what a linked list lacks, so this makes visible what the
  # midpoint-and-reverse dance is buying.
  nodes = []
  node = head
  while node
    nodes << node
    node = node.next
  end

  low = 0
  high = nodes.length - 1
  while low < high
    nodes[low].next = nodes[high]
    low += 1
    break if low == high

    nodes[high].next = nodes[low]
    high -= 1
  end

  nodes[low].next = nil unless nodes.empty?
  head
end
