def add_two_numbers(l1, l2)
  # Turn both lists into whole numbers, add, and take the sum apart again. It
  # reads well and is fine in Ruby, whose Integers grow into bignums on their
  # own, but it is the version that breaks the moment the language has a
  # fixed-width integer, which is precisely why the problem is posed as a list
  # of digits.
  total = value(l1) + value(l2)

  dummy = ListNode.new
  tail = dummy
  loop do
    total, digit = total.divmod(10)
    tail.next = ListNode.new(digit)
    tail = tail.next
    return dummy.next if total.zero?
  end
end

def value(node)
  total = 0
  place = 1
  while node
    total += node.val * place
    place *= 10
    node = node.next
  end
  total
end
