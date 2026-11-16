class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def maxDepth(root):
    # Count the levels instead of measuring the branches: take the whole
    # frontier, replace it with all its children, and add one. No recursion and
    # no stack -- which is what makes this the version that survives a tree deep
    # enough to overflow one.
    depth = 0  # @1
    frontier = [root] if root is not None else []  # @2
    while frontier:  # @3
        depth += 1  # @4
        frontier = [  # @5
            child  # @5
            for node in frontier  # @6
            for child in (node.left, node.right)  # @6
            if child is not None  # @7
        ]
    return depth  # @8
