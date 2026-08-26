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

export function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  // Pre-order names the root; in-order says how much of the rest belongs to
  // each side. Neither traversal alone determines a tree, and this is why
  // together they do -- the split point found in the in-order list is exactly
  // the size of the left subtree, which is what carves up the pre-order list
  // too.
  if (preorder.length === 0) return null;
  const root = preorder[0];
  const split = inorder.indexOf(root);
  return new TreeNode(
    root,
    buildTree(preorder.slice(1, split + 1), inorder.slice(0, split)),
    buildTree(preorder.slice(split + 1), inorder.slice(split + 1)),
  );
}
