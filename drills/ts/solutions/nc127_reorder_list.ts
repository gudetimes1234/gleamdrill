export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function reorderList(head: ListNode | null): ListNode | null {
  // Three separate steps, each of which is its own drill: find the middle with
  // a slow and a fast pointer, reverse the back half, then weave the two
  // together. That decomposition is the whole trick -- none of the three needs
  // to know about the others.
  if (head === null || head.next === null) return head;

  let slow: ListNode = head;
  let fast: ListNode | null = head.next;
  while (fast !== null && fast.next !== null) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  let second = slow.next;
  slow.next = null;

  let previous: ListNode | null = null;
  while (second !== null) {
    const following: ListNode | null = second.next;
    second.next = previous;
    previous = second;
    second = following;
  }

  let first: ListNode | null = head;
  second = previous;
  while (second !== null) {
    const firstNext: ListNode | null = first!.next;
    const secondNext: ListNode | null = second.next;
    first!.next = second;
    second.next = firstNext;
    first = firstNext;
    second = secondNext;
  }

  return head;
}
