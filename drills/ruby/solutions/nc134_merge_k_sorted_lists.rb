def merge_k_lists(lists)
  # Merge in pairs, halving the number of lists each round. Folding them in
  # one at a time re-walks the growing result every time, O(k*n), while
  # pairing gives O(n log k) for the same merges, because each element is
  # copied once per round and there are log k rounds.
  lists = lists.compact
  return nil if lists.empty?

  while lists.length > 1
    lists = lists.each_slice(2).map { |first, second| second ? merge(first, second) : first }
  end
  lists[0]
end

def merge(first, second)
  dummy = ListNode.new
  tail = dummy
  while first && second
    if first.val <= second.val
      tail.next = first
      first = first.next
    else
      tail.next = second
      second = second.next
    end
    tail = tail.next
  end
  tail.next = first || second
  dummy.next
end
