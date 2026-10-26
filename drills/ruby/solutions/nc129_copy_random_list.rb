def copy_random_list(head)
  # One pass to create every copy, a second to wire them up. Resolving a link
  # on first sight cannot work: it may point at a node not yet copied, which
  # is the whole difficulty of the problem, and a map from original node to
  # copy is what removes it. Nodes hash by identity, and copies[nil] is nil.
  copies = {}

  node = head
  while node
    copies[node] = RandomNode.new(node.val)
    node = node.next
  end

  node = head
  while node
    copies[node].next = copies[node.next]
    copies[node].random = copies[node.random]
    node = node.next
  end

  copies[head]
end
