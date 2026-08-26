class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def rightSideView(root):
    # The last value on each level, which is what "seen from the right" means
    # once the question is asked level by level. Walking down the right children
    # alone is the tempting wrong answer: where the right side is short, a node
    # further left is the one that shows.
    seen = []
    frontier = [root] if root is not None else []
    while frontier:
        seen.append(frontier[-1].val)
        frontier = [
            child
            for node in frontier
            for child in (node.left, node.right)
            if child is not None
        ]
    return seen
