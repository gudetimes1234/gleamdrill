export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  // Take the smaller head and let the recursion produce the rest. No dummy and
  // no tail pointer -- the return value is the join -- at the cost of a frame
  // per node.
  if (list1 === null) return list2;
  if (list2 === null) return list1;
  if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  }
  list2.next = mergeTwoLists(list1, list2.next);
  return list2;
}
