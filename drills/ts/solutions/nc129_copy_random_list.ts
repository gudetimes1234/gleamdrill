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
  // One pass to create every copy, a second to wire them up. Resolving a link
  // on first sight cannot work: it may point at a node not yet copied, which is
  // the whole difficulty of the problem -- and a map from original node to copy
  // is what removes it.
  const copies = new Map<Node, Node>();

  for (let node = head; node !== null; node = node.next) {
    copies.set(node, new Node(node.val));
  }

  for (let node = head; node !== null; node = node.next) {
    const copy = copies.get(node)!;
    copy.next = node.next === null ? null : copies.get(node.next)!;
    copy.random = node.random === null ? null : copies.get(node.random)!;
  }

  return head === null ? null : copies.get(head)!;
}
