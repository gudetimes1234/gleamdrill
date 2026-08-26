export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function hasCycle(head: ListNode | null): boolean {
  // Remember every node visited and stop when one repeats. Obvious, correct,
  // and O(n) memory -- which is the whole cost the two-pointer version removes.
  // Note that it is the *nodes* that go in the set, not their values: repeated
  // values are ordinary, repeated nodes are the cycle.
  const seen = new Set<ListNode>();
  for (let node = head; node !== null; node = node.next) {
    if (seen.has(node)) return true;
    seen.add(node);
  }
  return false;
}
