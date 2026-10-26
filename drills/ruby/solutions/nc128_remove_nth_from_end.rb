def remove_nth_from_end(head, n)
  # Two pointers n apart. When the leading one runs off the end, the trailing
  # one is on the node *before* the doomed one, which is the node that has
  # to be rewritten, and the reason the gap is opened from a dummy rather than
  # from the head.
  dummy = ListNode.new(0, head)
  behind = ahead = dummy

  n.times do
    return head if ahead.next.nil?

    ahead = ahead.next
  end

  while ahead.next
    behind = behind.next
    ahead = ahead.next
  end

  behind.next = behind.next.next
  dummy.next
end
