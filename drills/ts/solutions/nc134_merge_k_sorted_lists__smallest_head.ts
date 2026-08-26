export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  // Take the smallest head across all the lists, over and over. This is the
  // heap solution with the heap spelled out as a scan, since JavaScript has no
  // priority queue: O(k) per element rather than O(log k), which is the entire
  // difference the heap makes. What it does not need is any pairing structure
  // -- it works just as well on lists arriving one at a time.
  const heads = lists.filter((head): head is ListNode => head !== null);
  const dummy = new ListNode();
  let tail = dummy;

  while (heads.length > 0) {
    let best = 0;
    for (let i = 1; i < heads.length; i++) if (heads[i].val < heads[best].val) best = i;
    const node = heads[best];
    tail.next = node;
    tail = node;
    if (node.next !== null) heads[best] = node.next;
    else heads.splice(best, 1);
  }

  tail.next = null;
  return dummy.next;
}
