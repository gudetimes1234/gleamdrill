export class Node {
  val: number;
  next: Node | null;
  random: Node | null;

  constructor(val = 0, next: Node | null = null, random: Node | null = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

export function copyRandomList(head: Node | null): Node | null {
  // The list itself replaces the map: each copy is spliced in directly after
  // its original, so "the copy of node X" is always X.next -- no lookup and no
  // O(n) table. Three passes instead of two, and the last one has to unweave
  // the two lists again, restoring the original exactly as it was.
  for (let node = head; node !== null; node = node.next!.next) {
    node.next = new Node(node.val, node.next);
  }

  for (let node = head; node !== null; node = node.next!.next) {
    if (node.random !== null) node.next!.random = node.random.next;
  }

  const copy = head === null ? null : head.next;
  let node = head;
  while (node !== null) {
    const originalNext = node.next!.next;
    if (originalNext !== null) node.next!.next = originalNext.next;
    node.next = originalNext;
    node = originalNext;
  }

  return copy;
}
