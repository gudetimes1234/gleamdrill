def reorder_list(head)
  # Three separate steps, each of which is its own drill: find the middle with
  # a slow and a fast pointer, reverse the back half, then weave the two
  # together. That decomposition is the whole trick; none of the three needs
  # to know about the others.
  return head if head.nil? || head.next.nil?

  slow = head
  fast = head.next
  while fast&.next
    slow = slow.next
    fast = fast.next.next
  end

  second = slow.next
  slow.next = nil

  previous = nil
  while second
    following = second.next
    second.next = previous
    previous = second
    second = following
  end

  first = head
  second = previous
  while second
    first_next = first.next
    second_next = second.next
    first.next = second
    second.next = first_next
    first = first_next
    second = second_next
  end

  head
end
