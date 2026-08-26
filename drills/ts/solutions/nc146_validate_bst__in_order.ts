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
  // A binary search tree is exactly a tree whose in-order walk is strictly
  // increasing -- that is the definition, restated so that no bounds have to be
  // threaded anywhere. The cost is the array: O(n) memory against the range
  // check's O(depth).
  const values: number[] = [];
  inOrder(root, values);
  return values.every((value, i) => i === 0 || values[i - 1] < value);
}

function inOrder(node: TreeNode | null, values: number[]): void {
  if (node === null) return;
  inOrder(node.left, values);
  values.push(node.val);
  inOrder(node.right, values);
}
