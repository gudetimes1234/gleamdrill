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

export function isBalanced(root: TreeNode | null): boolean {
  // The definition read literally: every node's two sides differ by at most
  // one, and both sides are themselves balanced. It recomputes height at every
  // node, so the work is O(n^2) on a spindly tree -- the price of separating
  // the two questions the single-pass version answers together.
  if (root === null) return true;
  return (
    Math.abs(height(root.left) - height(root.right)) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );
}

function height(node: TreeNode | null): number {
  return node === null ? 0 : 1 + Math.max(height(node.left), height(node.right));
}
