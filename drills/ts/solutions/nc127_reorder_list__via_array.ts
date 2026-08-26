export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function reorderList(head: ListNode | null): ListNode | null {
  // Collect the nodes into an array first, then relink them by index from both
  // ends. O(n) extra space against the in-place version's O(1) -- but random
  // access is exactly what a linked list lacks, so this makes visible what the
  // midpoint-and-reverse dance is buying.
  const nodes: ListNode[] = [];
  for (let node = head; node !== null; node = node.next) nodes.push(node);
  if (nodes.length === 0) return head;

  let low = 0;
  let high = nodes.length - 1;
  while (low < high) {
    nodes[low].next = nodes[high];
    low++;
    if (low === high) break;
    nodes[high].next = nodes[low];
    high--;
  }
  nodes[low].next = null;

  return head;
}
