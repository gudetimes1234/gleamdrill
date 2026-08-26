class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def buildTree(preorder, inorder):
    # Pre-order names the root; in-order says how much of the rest belongs to
    # each side. Neither traversal alone determines a tree, and this is why
    # together they do -- the split point found in the in-order list is exactly
    # the size of the left subtree, which is what carves up the pre-order list
    # too.
    if not preorder:
        return None
    root = preorder[0]
    split = inorder.index(root)
    return TreeNode(
        root,
        buildTree(preorder[1 : split + 1], inorder[:split]),
        buildTree(preorder[split + 1 :], inorder[split + 1 :]),
    )
