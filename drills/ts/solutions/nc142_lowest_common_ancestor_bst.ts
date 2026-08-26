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

export function lowestCommonAncestor(root: TreeNode | null, p: number, q: number): number {
  // The ordering does all the work. If both targets are below the current value
  // go left, if both are above go right, and otherwise this node is the split
  // point -- which is the answer. No searching for either node first, and no
  // comparing of paths.
  let node = root;
  while (node !== null) {
    if (p < node.val && q < node.val) node = node.left;
    else if (p > node.val && q > node.val) node = node.right;
    else return node.val;
  }
  return -1;
}
