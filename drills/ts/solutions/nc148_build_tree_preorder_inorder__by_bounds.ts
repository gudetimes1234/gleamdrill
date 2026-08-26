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
  // The same construction without slicing anything: a map from value to its
  // in-order position, plus a low and a high bound saying which slice each call
  // owns. Building the map once turns the repeated search for the root -- the
  // hidden O(n) inside the slicing version -- into a lookup.
  const places = new Map(inorder.map((value, i) => [value, i]));
  return take(preorder, { at: 0 }, places, 0, inorder.length - 1);
}

function take(
  preorder: number[],
  cursor: { at: number },
  places: Map<number, number>,
  low: number,
  high: number,
): TreeNode | null {
  if (low > high || cursor.at >= preorder.length) return null;
  const root = preorder[cursor.at++];
  const split = places.get(root)!;
  return new TreeNode(
    root,
    take(preorder, cursor, places, low, split - 1),
    take(preorder, cursor, places, split + 1, high),
  );
}
