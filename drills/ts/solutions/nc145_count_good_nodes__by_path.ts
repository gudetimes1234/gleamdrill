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
  // Carry the whole path instead of just its maximum, and take the maximum at
  // each node. The same answer for O(depth) memory per node rather than one
  // number -- the version worth writing once, because it makes plain that the
  // running maximum is a fold of the path, not a separate idea.
  return count(root, []);
}

function count(node: TreeNode | null, above: number[]): number {
  if (node === null) return 0;
  const here = above.every((other) => other <= node.val) ? 1 : 0;
  const below = [...above, node.val];
  return here + count(node.left, below) + count(node.right, below);
}
