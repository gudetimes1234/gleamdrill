class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def levelOrder(root):
    # Take the whole frontier at once rather than one node at a time: everything
    # on it is the current level, and its children are the next. That is what
    # makes the grouping fall out without tracking any depth -- a plain queue
    # would give the right order but no idea where each level ends.
    levels = []  # @1
    frontier = [root] if root is not None else []  # @2
    while frontier:  # @3
        levels.append([node.val for node in frontier])  # @4
        frontier = [  # @5
            child  # @5
            for node in frontier  # @6
            for child in (node.left, node.right)  # @6
            if child is not None  # @7
        ]
    return levels  # @8
