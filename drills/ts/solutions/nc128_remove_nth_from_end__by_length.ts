export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // Count first, then walk to the position. Two passes rather than one, and it
  // says outright what the two-pointer version encodes in a gap: nth from the
  // end is length minus n from the front. Where a list cannot be walked twice
  // -- a stream, say -- that is exactly the assumption that fails.
  let length = 0;
  for (let node = head; node !== null; node = node.next) length++;

  const index = length - n;
  if (index < 0) return head;

  const dummy = new ListNode(0, head);
  let before = dummy;
  for (let i = 0; i < index; i++) before = before.next!;
  before.next = before.next!.next;
  return dummy.next;
}
