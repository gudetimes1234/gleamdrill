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
  // Height and balance in one walk. A subtree reports its height, or reports
  // that something below it is already unbalanced -- and once that happens
  // nothing above needs measuring at all. Using -1 as the "not balanced" height
  // is what lets a single return value carry both answers.
  return measure(root) >= 0;
}

function measure(node: TreeNode | null): number {
  if (node === null) return 0;
  const left = measure(node.left);
  const right = measure(node.right);
  if (left < 0 || right < 0 || Math.abs(left - right) > 1) return -1;
  return 1 + Math.max(left, right);
}
