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

export function invertTree(root: TreeNode | null): TreeNode | null {
  // Write the tree out pre-order with a marker for every empty child, then read
  // it back taking the first subtree as the *right* child. The inversion
  // happens entirely in the reading -- nothing is ever swapped. Longer than the
  // direct recursion, and worth having because the same flatten/rebuild pair is
  // all Serialize and Deserialize is.
  const tokens: (number | null)[] = [];
  flatten(root, tokens);
  return rebuild(tokens, { at: 0 });
}

function flatten(node: TreeNode | null, tokens: (number | null)[]): void {
  if (node === null) {
    tokens.push(null);
    return;
  }
  tokens.push(node.val);
  flatten(node.left, tokens);
  flatten(node.right, tokens);
}

function rebuild(tokens: (number | null)[], cursor: { at: number }): TreeNode | null {
  const value = tokens[cursor.at++];
  if (value === null) return null;
  const first = rebuild(tokens, cursor);
  const second = rebuild(tokens, cursor);
  return new TreeNode(value, second, first);
}
