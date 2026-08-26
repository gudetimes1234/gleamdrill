export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  // Read both lists into arrays first, add positionally, then build the answer.
  // The same arithmetic, but the carry is handled after the fact rather than
  // during the walk -- which is what makes it clear that the single-pass
  // version is doing two things at once. Converting to whole numbers instead
  // would be simpler still and quietly wrong: a long list overflows a double.
  const first = digits(l1);
  const second = digits(l2);
  const sum: number[] = [];

  let carry = 0;
  for (let i = 0; i < Math.max(first.length, second.length); i++) {
    const total = (first[i] ?? 0) + (second[i] ?? 0) + carry;
    sum.push(total % 10);
    carry = Math.floor(total / 10);
  }
  if (carry !== 0) sum.push(carry);
  if (sum.length === 0) sum.push(0);

  let head: ListNode | null = null;
  for (let i = sum.length - 1; i >= 0; i--) head = new ListNode(sum[i], head);
  return head;
}

function digits(node: ListNode | null): number[] {
  const out: number[] = [];
  for (; node !== null; node = node.next) out.push(node.val);
  return out;
}
