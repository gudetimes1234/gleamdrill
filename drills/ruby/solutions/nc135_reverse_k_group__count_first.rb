def reverse_k_group(head, k)
  # Count once, then reverse exactly length / k groups. One length
  # calculation instead of a look-ahead per group, and it makes the boundary
  # explicit: everything past the last whole group is untouched, however long
  # it is.
  length = 0
  node = head
  while node
    length += 1
    node = node.next
  end

  dummy = ListNode.new(0, head)
  before = dummy
  node = head

  (length / k).times do
    first = node
    previous = nil
    k.times do
      following = node.next
      node.next = previous
      previous = node
      node = following
    end
    before.next = previous
    first.next = node
    before = first
  end

  dummy.next
end
