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
  // Pre-order with a marker for every empty child. Recording the empties is
  // what makes the format unambiguous -- a pre-order list of values alone
  // matches many different trees -- and it is also what lets the reader work
  // without any length information: it stops as soon as it has consumed a whole
  // subtree.
  const parts: string[] = [];
  write(root, parts);
  return parts.join(",");
}

export function deserialize(data: string): TreeNode | null {
  return read(data.split(","), { at: 0 });
}

function write(node: TreeNode | null, parts: string[]): void {
  if (node === null) {
    parts.push("#");
    return;
  }
  parts.push(String(node.val));
  write(node.left, parts);
  write(node.right, parts);
}

function read(parts: string[], cursor: { at: number }): TreeNode | null {
  const token = parts[cursor.at++];
  if (token === "#" || token === undefined) return null;
  const node = new TreeNode(Number(token));
  node.left = read(parts, cursor);
  node.right = read(parts, cursor);
  return node;
}
