need :reorder_list

def chain(values) = values.reverse.reduce(nil) { |head, value| ListNode.new(value, head) }

def values_of(node)
  out = []
  while node && out.length < 1000
    out << node.val
    node = node.next
  end
  out
end

# reorder_list rewrites the list in place, so the head it was given is the
# answer whether or not it also returns one.
def reordered(values)
  head = chain(values)
  returned = reorder_list(head)
  values_of(head || returned)
end

tc "reorder_list([1, 2, 3, 4])", [1, 4, 2, 3], reordered([1, 2, 3, 4])
tc "reorder_list([1, 2, 3, 4, 5]) -- the middle stays last", [1, 5, 2, 4, 3], reordered([1, 2, 3, 4, 5])
tc "reorder_list([1, 2])", [1, 2], reordered([1, 2])
tc "reorder_list([1])", [1], reordered([1])
tc "reorder_list([])", [], reordered([])
