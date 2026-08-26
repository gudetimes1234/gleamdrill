export class LRUCache {
  capacity: number;
  entries: Map<number, number>;

  constructor(capacity: number) {
    // A Map, leaning on the fact that it remembers insertion order: deleting a
    // key and putting it back makes it the newest, so the oldest is simply the
    // first key the iterator yields. That is the recency list, free.
    this.capacity = capacity;
    this.entries = new Map();
  }

  get(key: number): number {
    if (!this.entries.has(key)) return -1;
    // Reading counts as use, so the key moves to the newest position.
    const value = this.entries.get(key)!;
    this.entries.delete(key);
    this.entries.set(key, value);
    return value;
  }

  put(key: number, value: number): void {
    this.entries.delete(key);
    this.entries.set(key, value);
    if (this.entries.size > this.capacity) {
      this.entries.delete(this.entries.keys().next().value!);
    }
  }
}
