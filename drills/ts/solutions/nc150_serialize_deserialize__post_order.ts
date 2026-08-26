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

export function serialize(root: TreeNode | null): string {
  // Post-order instead of pre-order, still with a marker for every empty child.
  // The root is then the *last* token rather than the first, so the reader
  // works backwards -- and reading backwards means taking the right subtree
  // before the left. Worth writing once: the format is what decides the parse
  // direction, and nothing else about the two versions differs.
  const parts: string[] = [];
  write(root, parts);
  return parts.join(",");
}

export function deserialize(data: string): TreeNode | null {
  const parts = data.split(",");
  return read(parts, { at: parts.length - 1 });
}

function write(node: TreeNode | null, parts: string[]): void {
  if (node === null) {
    parts.push("#");
    return;
  }
  write(node.left, parts);
  write(node.right, parts);
  parts.push(String(node.val));
}

function read(parts: string[], cursor: { at: number }): TreeNode | null {
  const token = parts[cursor.at--];
  if (token === "#" || token === undefined) return null;
  const node = new TreeNode(Number(token));
  node.right = read(parts, cursor);
  node.left = read(parts, cursor);
  return node;
}
