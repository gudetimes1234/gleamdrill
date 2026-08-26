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

export function levelOrder(root: TreeNode | null): number[][] {
  // Take the whole frontier at once rather than one node at a time: everything
  // on it is the current level, and its children are the next. That is what
  // makes the grouping fall out without tracking any depth -- a plain queue
  // would give the right order but no idea where each level ends.
  const levels: number[][] = [];
  let frontier = root === null ? [] : [root];
  while (frontier.length > 0) {
    levels.push(frontier.map((node) => node.val));
    frontier = frontier.flatMap((node) =>
      [node.left, node.right].filter((child): child is TreeNode => child !== null),
    );
  }
  return levels;
}
