need :add_two_numbers

def chain(values) = values.reverse.reduce(nil) { |head, value| ListNode.new(value, head) }

def values_of(node)
  out = []
  while node && out.length < 1000
    out << node.val
    node = node.next
  end
  out
end

tc "add_two_numbers([2, 4, 3], [5, 6, 4]) -- 342 + 465", [7, 0, 8], values_of(add_two_numbers(chain([2, 4, 3]), chain([5, 6, 4])))
tc "add_two_numbers([0], [0])", [0], values_of(add_two_numbers(chain([0]), chain([0])))
tc "add_two_numbers([9, 9, 9], [1]) -- the carry runs all the way", [0, 0, 0, 1], values_of(add_two_numbers(chain([9, 9, 9]), chain([1])))
tc "add_two_numbers([5], [5]) -- the carry outlives both", [0, 1], values_of(add_two_numbers(chain([5]), chain([5])))
tc "add_two_numbers([1, 2], [3, 4, 5]) -- different lengths", [4, 6, 5], values_of(add_two_numbers(chain([1, 2]), chain([3, 4, 5])))
