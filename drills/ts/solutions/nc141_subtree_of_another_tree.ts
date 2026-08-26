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

export function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  // Try to match at every node. The two questions are kept apart on purpose:
  // "are these two trees identical" is the whole of the work, and "is it a
  // subtree" is that question asked once per node. O(n*m) in the worst case,
  // and a partial match that fails deep is what makes it so.
  if (subRoot === null) return true;
  if (root === null) return false;
  return same(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function same(a: TreeNode | null, b: TreeNode | null): boolean {
  if (a === null && b === null) return true;
  if (a === null || b === null) return false;
  return a.val === b.val && same(a.left, b.left) && same(a.right, b.right);
}
