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

export function maxDepth(root: TreeNode | null): number {
  // One more than the deeper of the two children, with an empty tree at zero.
  // The whole problem is that base case: everything else is the definition of
  // depth read aloud.
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
