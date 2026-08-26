export class TimeMap {
  private store = new Map<string, [number, string][]>();

  set(key: string, value: string, timestamp: number): void {
    // Timestamps only ever increase, so appending keeps each key's history
    // sorted for free.
    const history = this.store.get(key);
    if (history) history.push([timestamp, value]);
    else this.store.set(key, [[timestamp, value]]);
  }

  get(key: string, timestamp: number): string {
    // The history is sorted, so the newest entry at or before a timestamp is a
    // halving question, not a walk.
    const history = this.store.get(key) ?? [];
    let low = 0;
    let high = history.length - 1;
    let best = "";
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (history[mid][0] <= timestamp) {
        best = history[mid][1];
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return best;
  }
}
