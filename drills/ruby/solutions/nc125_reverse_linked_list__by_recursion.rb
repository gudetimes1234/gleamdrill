def reverse_list(head)
  # Reverse the rest, then hook the current node onto its end. The new head
  # comes back unchanged through every frame, which is why it is returned
  # rather than tracked, and head.next.next = head is the whole rewiring,
  # done on the way back out. O(n) stack, against the loop's O(1).
  return head if head.nil? || head.next.nil?

  reversed_rest = reverse_list(head.next)
  head.next.next = head
  head.next = nil
  reversed_rest
end
