export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function reverseList(head: ListNode | null): ListNode | null {
  // Three pointers and no new nodes: remember where you came from, look ahead
  // before rewriting the link, then step on. Losing the look-ahead is the
  // classic bug -- once head.next has been overwritten, the rest of the list is
  // unreachable.
  let previous: ListNode | null = null;
  while (head !== null) {
    const following = head.next;
    head.next = previous;
    previous = head;
    head = following;
  }
  return previous;
}
