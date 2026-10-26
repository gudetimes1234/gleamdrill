def merge_two_lists(list1, list2)
  # Take the smaller head and let the recursion produce the rest. No dummy and
  # no tail pointer (the return value is the join) at the cost of a frame
  # per node.
  return list2 if list1.nil?
  return list1 if list2.nil?

  if list1.val <= list2.val
    list1.next = merge_two_lists(list1.next, list2)
    return list1
  end
  list2.next = merge_two_lists(list1, list2.next)
  list2
end
