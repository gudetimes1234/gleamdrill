require "set"

def has_cycle(head)
  # Remember every node visited and stop when one repeats. Obvious, correct,
  # and O(n) memory, which is the whole cost the two-pointer version removes.
  # It is the *nodes* that go in the set, not their values: repeated values
  # are ordinary, repeated nodes are the cycle. `compare_by_identity` is what
  # says so, since a set would otherwise compare its members by `eql?`.
  seen = Set.new.compare_by_identity
  while head
    return true if seen.include?(head)

    seen.add(head)
    head = head.next
  end
  false
end
