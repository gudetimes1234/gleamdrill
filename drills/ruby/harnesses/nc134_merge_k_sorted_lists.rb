need :merge_k_lists

def chain(values)
  head = nil
  values.reverse_each { |value| head = ListNode.new(value, head) }
  head
end

def chain_values(node)
  out = []
  while node && out.length < 1000
    out << node.val
    node = node.next
  end
  out
end

def merged(lists) = chain_values(merge_k_lists(lists.map { |values| chain(values) }))

tc "merge_k_lists([[1, 4, 5], [1, 3, 4], [2, 6]])", [1, 1, 2, 3, 4, 4, 5, 6], merged([[1, 4, 5], [1, 3, 4], [2, 6]])
tc "merge_k_lists([]) -- no lists at all", [], merged([])
tc "merge_k_lists([[]]) -- one empty list", [], merged([[]])
tc "merge_k_lists([[1], [], [0]])", [0, 1], merged([[1], [], [0]])
tc "merge_k_lists([[2, 2], [2]]) -- ties everywhere", [2, 2, 2], merged([[2, 2], [2]])
