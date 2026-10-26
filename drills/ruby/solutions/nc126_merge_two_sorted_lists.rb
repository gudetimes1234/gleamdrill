def merge_two_lists(list1, list2)
  # The dummy head is what removes the special case: without it, the first
  # node has to be chosen separately from all the others because there is
  # nothing to attach it to. No new nodes beyond it; the existing ones are
  # spliced.
  dummy = ListNode.new
  tail = dummy

  while list1 && list2
    if list1.val <= list2.val
      tail.next, list1 = list1, list1.next
    else
      tail.next, list2 = list2, list2.next
    end
    tail = tail.next
  end

  # Whichever list is left is already sorted and already linked.
  tail.next = list1 || list2
  dummy.next
end
