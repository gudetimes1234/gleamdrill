export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function hasCycle(head: ListNode | null): boolean {
  // Floyd's tortoise and hare. One pointer takes single steps, the other
  // double; if there is a loop the fast one is going round it and gains one
  // place per step on the slow one, so it must eventually land on it. If there
  // is no loop the fast one runs off the end first. Constant memory, and no
  // node is ever marked.
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
