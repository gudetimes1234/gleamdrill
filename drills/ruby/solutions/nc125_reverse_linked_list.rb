def reverse_list(head)
  # Three references and no new nodes: remember where you came from, look ahead
  # before rewriting the link, then step on. Losing the look-ahead is the
  # classic bug: once head.next has been overwritten, the rest of the list
  # is unreachable.
  previous = nil
  while head
    following = head.next
    head.next = previous
    previous = head
    head = following
  end
  previous
end
