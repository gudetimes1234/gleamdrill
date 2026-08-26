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

export function rightSideView(root: TreeNode | null): number[] {
  // The last value on each level, which is what "seen from the right" means
  // once the question is asked level by level. Walking down the right children
  // alone is the tempting wrong answer: where the right side is short, a node
  // further left is the one that shows.
  const seen: number[] = [];
  let frontier = root === null ? [] : [root];
  while (frontier.length > 0) {
    seen.push(frontier[frontier.length - 1].val);
    frontier = frontier.flatMap((node) =>
      [node.left, node.right].filter((child): child is TreeNode => child !== null),
    );
  }
  return seen;
}
