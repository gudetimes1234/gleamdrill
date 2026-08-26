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

export function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  // Serialise both trees and ask whether one string contains the other. That
  // turns an O(n*m) tree comparison into substring search, which is linear with
  // the right algorithm. It is only sound because the serialisation marks the
  // empty children: without them "2" inside "12" would match, and so would a
  // subtree that starts the same way but is missing a child.
  return serialise(root).includes(serialise(subRoot));
}

function serialise(node: TreeNode | null): string {
  if (node === null) return "#";
  return "(" + node.val + serialise(node.left) + serialise(node.right) + ")";
}
