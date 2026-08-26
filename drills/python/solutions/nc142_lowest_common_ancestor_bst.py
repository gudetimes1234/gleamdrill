class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def lowestCommonAncestor(root, p, q):
    # The ordering does all the work. If both targets are below the current
    # value go left, if both are above go right, and otherwise this node is the
    # split point -- which is the answer. No searching for either node first,
    # and no comparing of paths.
    node = root
    while node is not None:
        if p < node.val and q < node.val:
            node = node.left
        elif p > node.val and q > node.val:
            node = node.right
        else:
            return node.val
    return -1
