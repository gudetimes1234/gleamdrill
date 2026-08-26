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

export function kthSmallest(root: TreeNode | null, k: number): number {
  // An in-order walk of a search tree visits the values in order, so the answer
  // is the kth thing it reaches. Stopping there is the point: the tree below
  // the kth value is never touched, which is what separates this from sorting
  // everything. The explicit stack is what makes stopping possible -- a
  // recursive walk would have to run to the end.
  const stack: TreeNode[] = [];
  let node = root;
  while (stack.length > 0 || node !== null) {
    while (node !== null) {
      stack.push(node);
      node = node.left;
    }
    const current = stack.pop()!;
    if (--k === 0) return current.val;
    node = current.right;
  }
  return -1;
}
