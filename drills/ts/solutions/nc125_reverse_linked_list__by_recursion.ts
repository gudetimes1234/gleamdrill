export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function reverseList(head: ListNode | null): ListNode | null {
  // Reverse the rest, then hook the current node onto its end. The new head
  // comes back unchanged through every frame, which is why it is returned
  // rather than tracked -- and head.next.next = head is the whole rewiring,
  // done on the way back out. O(n) stack, against the loop's O(1).
  if (head === null || head.next === null) return head;
  const reversedRest = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return reversedRest;
}
