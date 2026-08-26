export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  // The dummy head is what removes the special case: without it, the first node
  // has to be chosen separately from all the others because there is nothing to
  // attach it to. No new nodes beyond it -- the existing ones are spliced.
  const dummy = new ListNode();
  let tail = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }

  // Whichever list is left is already sorted and already linked.
  tail.next = list1 !== null ? list1 : list2;
  return dummy.next;
}
