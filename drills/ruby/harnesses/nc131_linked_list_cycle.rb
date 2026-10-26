need :has_cycle

# pos is the index the tail links back to, or nil for a list that ends.
def chain(values, pos)
  nodes = values.map { |value| ListNode.new(value) }
  nodes.each_cons(2) { |node, following| node.next = following }
  nodes[-1].next = nodes[pos] if !nodes.empty? && pos
  nodes[0]
end

tc "has_cycle([3, 2, 0, -4], tail -> index 1)", true, has_cycle(chain([3, 2, 0, -4], 1))
tc "has_cycle([1, 2], no cycle)", false, has_cycle(chain([1, 2], nil))
tc "has_cycle([1], no cycle)", false, has_cycle(chain([1], nil))
tc "has_cycle([1], tail -> index 0)", true, has_cycle(chain([1], 0))
tc "has_cycle([])", false, has_cycle(chain([], nil))
tc "has_cycle([1, 2], tail -> index 0)", true, has_cycle(chain([1, 2], 0))
