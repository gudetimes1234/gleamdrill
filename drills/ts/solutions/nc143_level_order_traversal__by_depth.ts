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
  // Walk depth-first and file each value under its depth. The traversal order
  // is wrong for the answer, but appending to the right bucket puts it right --
  // and within a level, left is still visited before right, which is all the
  // ordering the answer needs. One array of buckets instead of a frontier.
  const levels: number[][] = [];
  collect(root, 0, levels);
  return levels;
}

function collect(node: TreeNode | null, depth: number, levels: number[][]): void {
  if (node === null) return;
  if (levels.length === depth) levels.push([]);
  levels[depth].push(node.val);
  collect(node.left, depth + 1, levels);
  collect(node.right, depth + 1, levels);
}
