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
    seen = []  # @1
    frontier = [root] if root is not None else []  # @2
    while frontier:  # @3
        seen.append(frontier[-1].val)  # @4
        frontier = [  # @5
            child  # @5
            for node in frontier  # @6
            for child in (node.left, node.right)  # @6
            if child is not None  # @7
        ]
    return seen  # @8
