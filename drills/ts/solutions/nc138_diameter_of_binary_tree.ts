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
  // One walk, doing two jobs: each call returns its own height, and on the way
  // past it records the path *through* that node -- left height plus right
  // height. The answer is the largest such path, so it is never returned, only
  // tracked. That split between what a call returns and what it records is the
  // pattern worth keeping.
  return measure(root)[1];
}

function measure(node: TreeNode | null): [number, number] {
  if (node === null) return [0, 0];
  const [leftHeight, leftWidest] = measure(node.left);
  const [rightHeight, rightWidest] = measure(node.right);
  return [
    1 + Math.max(leftHeight, rightHeight),
    Math.max(leftHeight + rightHeight, leftWidest, rightWidest),
  ];
}
