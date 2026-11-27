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
    node = root  # @1
    while node is not None:  # @2
        if p < node.val and q < node.val:  # @3
            node = node.left  # @3
        elif p > node.val and q > node.val:  # @4
            node = node.right  # @4
        else:  # @5
            return node.val  # @5
    return -1  # @6
