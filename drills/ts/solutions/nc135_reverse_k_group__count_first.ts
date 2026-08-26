export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  // Count once, then reverse exactly length / k groups. One length calculation
  // instead of a look-ahead per group -- and it makes the boundary explicit:
  // everything past the last whole group is untouched, however long it is.
  let length = 0;
  for (let n = head; n !== null; n = n.next) length++;

  const dummy = new ListNode(0, head);
  let before = dummy;
  let node = head;

  for (let group = 0; group < Math.floor(length / k); group++) {
    const first = node!;
    let previous: ListNode | null = null;
    for (let i = 0; i < k; i++) {
      const following: ListNode | null = node!.next;
      node!.next = previous;
      previous = node;
      node = following;
    }
    before.next = previous;
    first.next = node;
    before = first;
  }

  return dummy.next;
}
