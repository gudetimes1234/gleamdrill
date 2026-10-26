need :reverse_k_group

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

def grouped(values, k) = chain_values(reverse_k_group(chain(values), k))

tc "reverse_k_group([1, 2, 3, 4, 5], 2)", [2, 1, 4, 3, 5], grouped([1, 2, 3, 4, 5], 2)
tc "reverse_k_group([1, 2, 3, 4, 5], 3) -- the last two are left alone", [3, 2, 1, 4, 5], grouped([1, 2, 3, 4, 5], 3)
tc "reverse_k_group([1, 2, 3, 4], 4)", [4, 3, 2, 1], grouped([1, 2, 3, 4], 4)
tc "reverse_k_group([1, 2, 3], 1) -- nothing changes", [1, 2, 3], grouped([1, 2, 3], 1)
tc "reverse_k_group([1, 2], 5) -- the group never fills", [1, 2], grouped([1, 2], 5)
tc "reverse_k_group([], 2)", [], grouped([], 2)
