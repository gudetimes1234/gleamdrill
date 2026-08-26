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

export function maxPathSum(root: TreeNode | null): number {
  // Every path through every node, measured outright: for each node, take the
  // best downward run on each side and add them. It recomputes those runs from
  // scratch at every node, so it is O(n^2) on a spindly tree -- the cost of
  // asking the two questions separately instead of returning both from one
  // walk.
  const found = candidates(root);
  return found.length > 0 ? Math.max(...found) : 0;
}

function candidates(node: TreeNode | null): number[] {
  if (node === null) return [];
  const through =
    node.val + Math.max(downwards(node.left), 0) + Math.max(downwards(node.right), 0);
  return [through, ...candidates(node.left), ...candidates(node.right)];
}

function downwards(node: TreeNode | null): number {
  if (node === null) return 0;
  return node.val + Math.max(downwards(node.left), downwards(node.right), 0);
}
