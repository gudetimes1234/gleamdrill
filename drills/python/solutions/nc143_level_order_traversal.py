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
    levels = []
    frontier = [root] if root is not None else []
    while frontier:
        levels.append([node.val for node in frontier])
        frontier = [
            child
            for node in frontier
            for child in (node.left, node.right)
            if child is not None
        ]
    return levels
