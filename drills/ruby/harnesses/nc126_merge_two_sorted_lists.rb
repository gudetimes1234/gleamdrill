need :merge_two_lists

def chain(values) = values.reverse.reduce(nil) { |head, value| ListNode.new(value, head) }

def values_of(node)
  out = []
  while node && out.length < 1000
    out << node.val
    node = node.next
  end
  out
end

tc "merge_two_lists([1, 2, 4], [1, 3, 4])", [1, 1, 2, 3, 4, 4], values_of(merge_two_lists(chain([1, 2, 4]), chain([1, 3, 4])))
tc "merge_two_lists([], [])", [], values_of(merge_two_lists(chain([]), chain([])))
tc "merge_two_lists([], [0])", [0], values_of(merge_two_lists(chain([]), chain([0])))
tc "merge_two_lists([5], [1, 2, 3])", [1, 2, 3, 5], values_of(merge_two_lists(chain([5]), chain([1, 2, 3])))
