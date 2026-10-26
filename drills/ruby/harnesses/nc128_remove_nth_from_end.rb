need :remove_nth_from_end

def chain(values) = values.reverse.reduce(nil) { |head, value| ListNode.new(value, head) }

def values_of(node)
  out = []
  while node && out.length < 1000
    out << node.val
    node = node.next
  end
  out
end

tc "remove_nth_from_end([1, 2, 3, 4, 5], 2)", [1, 2, 3, 5], values_of(remove_nth_from_end(chain([1, 2, 3, 4, 5]), 2))
tc "remove_nth_from_end([1], 1)", [], values_of(remove_nth_from_end(chain([1]), 1))
tc "remove_nth_from_end([1, 2], 1)", [1], values_of(remove_nth_from_end(chain([1, 2]), 1))
tc "remove_nth_from_end([1, 2], 2) -- the head goes", [2], values_of(remove_nth_from_end(chain([1, 2]), 2))
tc "remove_nth_from_end([1, 2, 3], 5) -- nothing to remove", [1, 2, 3], values_of(remove_nth_from_end(chain([1, 2, 3]), 5))
