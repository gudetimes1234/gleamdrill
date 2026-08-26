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

export function goodNodes(root: TreeNode | null): number {
  // Carry the largest value seen on the way down. A node is good when nothing
  // above it is bigger, so the check needs no knowledge of the tree below --
  // which is what makes one pass enough. The root is always good, and passing
  // its own value down as the initial maximum is what says so.
  if (root === null) return 0;
  return count(root, root.val);
}

function count(node: TreeNode | null, largest: number): number {
  if (node === null) return 0;
  const here = node.val >= largest ? 1 : 0;
  const next = Math.max(largest, node.val);
  return here + count(node.left, next) + count(node.right, next);
}
