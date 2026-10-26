def reverse_k_group(head, k)
  # Look ahead k nodes *before* reversing anything. That check is the whole
  # difficulty: once the rewiring starts there is no way to tell how far it
  # got, so a short final group would be reversed by mistake.
  dummy = ListNode.new(0, head)
  before = dummy

  loop do
    after = before
    k.times do
      after = after.next
      return dummy.next if after.nil?
    end

    node = before.next
    previous = after.next
    first = node
    k.times do
      following = node.next
      node.next = previous
      previous = node
      node = following
    end

    before.next = previous
    before = first
  end
end
