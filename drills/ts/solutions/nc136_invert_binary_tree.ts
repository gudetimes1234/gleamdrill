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

export function invertTree(root: TreeNode | null): TreeNode | null {
  // Swap the children, then invert each of them. The swap and the recursion are
  // the same two lines, which is why this is the shortest tree problem there is
  // -- and why the order does not matter: swapping before or after recursing
  // gives the same tree.
  if (root === null) return null;
  const left = invertTree(root.left);
  root.left = invertTree(root.right);
  root.right = left;
  return root;
}
