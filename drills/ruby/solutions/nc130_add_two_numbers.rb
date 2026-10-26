def add_two_numbers(l1, l2)
  # Both numbers arrive least significant digit first, which is exactly the
  # order addition wants: no reversing and no length matching. The loop
  # condition includes the carry, because 5 + 5 produces a digit that neither
  # input has a node for.
  dummy = ListNode.new
  tail = dummy
  carry = 0

  while l1 || l2 || carry.positive?
    total = carry
    if l1
      total += l1.val
      l1 = l1.next
    end
    if l2
      total += l2.val
      l2 = l2.next
    end
    carry, digit = total.divmod(10)
    tail.next = ListNode.new(digit)
    tail = tail.next
  end

  dummy.next
end
