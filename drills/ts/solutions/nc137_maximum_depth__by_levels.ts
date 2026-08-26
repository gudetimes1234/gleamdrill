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

export function maxDepth(root: TreeNode | null): number {
  // Count the levels instead of measuring the branches: take the whole
  // frontier, replace it with all its children, and add one. No recursion and
  // no stack -- which is what makes this the version that survives a tree deep
  // enough to overflow one.
  let depth = 0;
  let frontier = root === null ? [] : [root];
  while (frontier.length > 0) {
    depth++;
    frontier = frontier.flatMap((node) =>
      [node.left, node.right].filter((child): child is TreeNode => child !== null),
    );
  }
  return depth;
}
