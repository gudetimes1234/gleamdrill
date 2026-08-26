export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export function rightSideView(root: TreeNode | null): number[] {
  // Depth-first, visiting the right child first, and recording a value only
  // when its depth is met for the first time. No frontier at all: being first
  // to reach a depth is the same thing as being rightmost on it, given that
  // order of visiting.
  const seen: number[] = [];
  look(root, 0, seen);
  return seen;
}

function look(node: TreeNode | null, depth: number, seen: number[]): void {
  if (node === null) return;
  if (depth === seen.length) seen.push(node.val);
  look(node.right, depth + 1, seen);
  look(node.left, depth + 1, seen);
}
