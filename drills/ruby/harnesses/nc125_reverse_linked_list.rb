need :reverse_list

def chain(values) = values.reverse.reduce(nil) { |head, value| ListNode.new(value, head) }

def values_of(node)
  out = []
  while node && out.length < 1000
    out << node.val
    node = node.next
  end
  out
end

tc "reverse_list([1, 2, 3, 4, 5])", [5, 4, 3, 2, 1], values_of(reverse_list(chain([1, 2, 3, 4, 5])))
tc "reverse_list([1, 2])", [2, 1], values_of(reverse_list(chain([1, 2])))
tc "reverse_list([]) -- an empty list", [], values_of(reverse_list(chain([])))
tc "reverse_list([7])", [7], values_of(reverse_list(chain([7])))
