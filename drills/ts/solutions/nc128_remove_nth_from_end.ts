export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // Two pointers n apart. When the leading one runs off the end, the trailing
  // one is on the node *before* the doomed one -- which is the node that has to
  // be rewritten, and the reason the gap is opened from a dummy rather than
  // from the head.
  const dummy = new ListNode(0, head);
  let behind = dummy;
  let ahead = dummy;

  for (let i = 0; i < n; i++) {
    if (ahead.next === null) return head;
    ahead = ahead.next;
  }

  while (ahead.next !== null) {
    behind = behind.next!;
    ahead = ahead.next;
  }

  behind.next = behind.next!.next;
  return dummy.next;
}
