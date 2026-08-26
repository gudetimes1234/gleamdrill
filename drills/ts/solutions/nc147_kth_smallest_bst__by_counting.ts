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

export function kthSmallest(root: TreeNode | null, k: number): number {
  // Count the left subtree and decide which way to go -- fewer than k on the
  // left means the answer is this node or to its right. It descends one path
  // instead of walking in order, and it is the version that adapts when the
  // tree stores its own subtree sizes, which turns the whole thing into
  // O(depth).
  let node = root;
  while (node !== null) {
    const onTheLeft = size(node.left);
    if (k <= onTheLeft) node = node.left;
    else if (k === onTheLeft + 1) return node.val;
    else {
      k -= onTheLeft + 1;
      node = node.right;
    }
  }
  return -1;
}

function size(node: TreeNode | null): number {
  return node === null ? 0 : 1 + size(node.left) + size(node.right);
}
