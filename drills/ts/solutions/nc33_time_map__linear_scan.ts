export class TimeMap {
  private store = new Map<string, [number, string][]>();

  set(key: string, value: string, timestamp: number): void {
    this.store.set(key, [[timestamp, value], ...(this.store.get(key) ?? [])]);
  }

  get(key: string, timestamp: number): string {
    // Newest first, so the first entry old enough is the answer. O(n) per
    // lookup against the halving version's O(log n), but there is no split
    // arithmetic to get wrong.
    for (const [stamp, value] of this.store.get(key) ?? []) {
      if (stamp <= timestamp) return value;
    }
    return "";
  }
}
