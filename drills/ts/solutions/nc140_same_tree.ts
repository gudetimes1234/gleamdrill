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

export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  // Walk both trees in step. Two empties match, an empty and a node never do,
  // and two nodes match when their values do and both pairs of children do. The
  // same shape is what Subtree of Another Tree and Symmetric Tree are built
  // from, which is why it is worth writing out rather than comparing
  // serialisations.
  if (p === null && q === null) return true;
  if (p === null || q === null) return false;
  return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
