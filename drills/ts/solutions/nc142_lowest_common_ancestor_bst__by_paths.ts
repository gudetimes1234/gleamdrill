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
  // Find the path from the root to each target, then take the last node they
  // share. It ignores the ordering entirely, which is why it is the version
  // that also works on a plain binary tree -- at the cost of two searches and
  // two stored paths rather than one walk and nothing.
  const toP = path(root, p);
  const toQ = path(root, q);
  let best = -1;
  for (let i = 0; i < Math.min(toP.length, toQ.length); i++) {
    if (toP[i] !== toQ[i]) break;
    best = toP[i];
  }
  return best;
}

function path(node: TreeNode | null, target: number): number[] {
  if (node === null) return [];
  if (node.val === target) return [node.val];
  for (const side of [node.left, node.right]) {
    const found = path(side, target);
    if (found.length > 0) return [node.val, ...found];
  }
  return [];
}
