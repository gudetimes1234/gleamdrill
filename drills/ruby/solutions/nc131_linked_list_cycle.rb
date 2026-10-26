def has_cycle(head)
  # Floyd's tortoise and hare. One pointer takes single steps, the other
  # double; if there is a loop the fast one is going round it and gains one
  # place per step on the slow one, so it must eventually land on it. If there
  # is no loop the fast one runs off the end first. Constant memory, and no
  # node is ever marked.
  slow = fast = head
  while fast && fast.next
    slow = slow.next
    fast = fast.next.next
    return true if slow.equal?(fast)
  end
  false
end
