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

export function isValidBST(root: TreeNode | null): boolean {
  // Check against a range, not against the parent. A node can be larger than
  // its own parent and still break the order, because the constraint comes from
  // an ancestor further up -- and that is the whole difficulty. Going left
  // tightens the upper bound, going right the lower one.
  return within(root, null, null);
}

function within(node: TreeNode | null, low: number | null, high: number | null): boolean {
  if (node === null) return true;
  if (low !== null && node.val <= low) return false;
  if (high !== null && node.val >= high) return false;
  return within(node.left, low, node.val) && within(node.right, node.val, high);
}
