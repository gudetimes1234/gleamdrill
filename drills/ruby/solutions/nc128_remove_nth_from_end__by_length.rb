def remove_nth_from_end(head, n)
  # Count first, then walk to the position. Two passes rather than one, and it
  # says outright what the two-pointer version encodes in a gap: nth from the
  # end is length minus n from the front. Where a list cannot be walked twice
  # (a stream, say) that is exactly the assumption that fails.
  length = 0
  node = head
  while node
    length += 1
    node = node.next
  end

  index = length - n
  return head if index.negative?

  dummy = ListNode.new(0, head)
  before = dummy
  index.times { before = before.next }
  before.next = before.next.next
  dummy.next
end
