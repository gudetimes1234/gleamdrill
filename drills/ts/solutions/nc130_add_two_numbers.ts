export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  // Both numbers arrive least significant digit first, which is exactly the
  // order addition wants -- no reversing and no length matching. The loop
  // condition includes the carry, because 5 + 5 produces a digit that neither
  // input has a node for.
  const dummy = new ListNode();
  let tail = dummy;
  let carry = 0;

  while (l1 !== null || l2 !== null || carry !== 0) {
    let total = carry;
    if (l1 !== null) {
      total += l1.val;
      l1 = l1.next;
    }
    if (l2 !== null) {
      total += l2.val;
      l2 = l2.next;
    }
    carry = Math.floor(total / 10);
    tail.next = new ListNode(total % 10);
    tail = tail.next;
  }

  return dummy.next;
}
