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

export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  // Turn each tree into a string and compare those. It works only because the
  // serialisation records the empty children too: without a marker for them,
  // different trees flatten to the same sequence -- the same trap Serialize and
  // Deserialize turns on.
  return serialise(p) === serialise(q);
}

function serialise(node: TreeNode | null): string {
  if (node === null) return "#";
  return "(" + node.val + serialise(node.left) + serialise(node.right) + ")";
}
