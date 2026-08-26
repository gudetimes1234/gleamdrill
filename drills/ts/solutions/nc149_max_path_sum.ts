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

export function maxPathSum(root: TreeNode | null): number {
  // Two different quantities, which is the whole trick. What a node *returns*
  // is the best path that can continue upwards -- so at most one of its
  // children. What it *records* is the best path through it, which may use
  // both. A negative branch is dropped rather than added, because a path is
  // allowed to stop.
  if (root === null) return 0;
  return walk(root)[1];
}

function walk(node: TreeNode | null): [number, number] {
  if (node === null) return [0, -Infinity];
  const [leftUp, leftBest] = walk(node.left);
  const [rightUp, rightBest] = walk(node.right);
  const leftGain = Math.max(leftUp, 0);
  const rightGain = Math.max(rightUp, 0);
  return [
    node.val + Math.max(leftGain, rightGain),
    Math.max(node.val + leftGain + rightGain, leftBest, rightBest),
  ];
}
