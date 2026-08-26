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

export function diameterOfBinaryTree(root: TreeNode | null): number {
  // Ask every node how tall its two sides are and keep the largest sum. Correct
  // and obvious, but height is recomputed from scratch at every node, so a
  // balanced tree costs O(n log n) and a spindly one O(n^2) -- which is exactly
  // what returning the height alongside the answer avoids.
  if (root === null) return 0;
  return Math.max(
    height(root.left) + height(root.right),
    diameterOfBinaryTree(root.left),
    diameterOfBinaryTree(root.right),
  );
}

function height(node: TreeNode | null): number {
  return node === null ? 0 : 1 + Math.max(height(node.left), height(node.right));
}
