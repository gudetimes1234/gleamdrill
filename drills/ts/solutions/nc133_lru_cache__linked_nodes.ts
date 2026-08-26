type Entry = { key: number; value: number; prev: Entry | null; next: Entry | null };

export class LRUCache {
  capacity: number;
  nodes: Map<number, Entry>;
  head: Entry;
  tail: Entry;

  constructor(capacity: number) {
    // A doubly linked list of keys, newest at the head, plus a map from key to
    // its node. The map makes finding a node O(1) and the back-pointers make
    // unlinking it O(1) -- neither alone is enough, which is why this is the
    // structure the problem is really about.
    this.capacity = capacity;
    this.nodes = new Map();
    this.head = { key: 0, value: 0, prev: null, next: null };
    this.tail = { key: 0, value: 0, prev: this.head, next: null };
    this.head.next = this.tail;
  }

  get(key: number): number {
    const node = this.nodes.get(key);
    if (node === undefined) return -1;
    this.unlink(node);
    this.push(node);
    return node.value;
  }

  put(key: number, value: number): void {
    const existing = this.nodes.get(key);
    if (existing !== undefined) {
      this.unlink(existing);
      this.nodes.delete(key);
    }
    const node: Entry = { key, value, prev: null, next: null };
    this.nodes.set(key, node);
    this.push(node);
    if (this.nodes.size > this.capacity) {
      const oldest = this.tail.prev!;
      this.unlink(oldest);
      this.nodes.delete(oldest.key);
    }
  }

  push(node: Entry): void {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  unlink(node: Entry): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }
}
