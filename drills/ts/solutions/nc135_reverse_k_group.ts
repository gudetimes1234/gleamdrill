export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  // Look ahead k nodes *before* reversing anything. That check is the whole
  // difficulty: once the rewiring starts there is no way to tell how far it
  // got, so a short final group would be reversed by mistake.
  const dummy = new ListNode(0, head);
  let before = dummy;

  for (;;) {
    let after: ListNode | null = before;
    for (let i = 0; i < k; i++) {
      after = after!.next;
      if (after === null) return dummy.next;
    }

    let node = before.next;
    let previous: ListNode | null = after!.next;
    const first = node!;
    for (let i = 0; i < k; i++) {
      const following: ListNode | null = node!.next;
      node!.next = previous;
      previous = node;
      node = following;
    }

    before.next = previous;
    before = first;
  }
}
