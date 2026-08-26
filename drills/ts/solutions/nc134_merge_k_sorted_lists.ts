export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  // Merge in pairs, halving the number of lists each round. Folding them in one
  // at a time re-walks the growing result every time -- O(k*n) -- while pairing
  // gives O(n log k) for the same merges, because each element is copied once
  // per round and there are log k rounds.
  let remaining = lists.filter((head) => head !== null);
  if (remaining.length === 0) return null;

  while (remaining.length > 1) {
    const merged: (ListNode | null)[] = [];
    for (let i = 0; i < remaining.length; i += 2) {
      merged.push(i + 1 < remaining.length ? merge(remaining[i], remaining[i + 1]) : remaining[i]);
    }
    remaining = merged;
  }

  return remaining[0];
}

function merge(first: ListNode | null, second: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  let tail = dummy;
  while (first !== null && second !== null) {
    if (first.val <= second.val) {
      tail.next = first;
      first = first.next;
    } else {
      tail.next = second;
      second = second.next;
    }
    tail = tail.next;
  }
  tail.next = first !== null ? first : second;
  return dummy.next;
}
