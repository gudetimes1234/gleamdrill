def copy_random_list(head)
  # The list itself replaces the map: each copy is spliced in directly after
  # its original, so "the copy of node X" is always X.next, with no lookup and
  # no O(n) table. Three passes instead of two, and the last one has to
  # unweave the two lists again, restoring the original exactly as it was.
  node = head
  while node
    node.next = RandomNode.new(node.val, node.next)
    node = node.next.next
  end

  node = head
  while node
    node.next.random = node.random.next if node.random
    node = node.next.next
  end

  copy = head&.next
  node = head
  while node
    original_next = node.next.next
    node.next.next = original_next.next if original_next
    node.next = original_next
    node = original_next
  end

  copy
end
