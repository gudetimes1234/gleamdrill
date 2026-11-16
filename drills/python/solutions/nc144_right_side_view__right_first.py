class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def rightSideView(root):
    # Depth-first, visiting the right child first, and recording a value only
    # when its depth is met for the first time. No frontier at all: being first
    # to reach a depth is the same thing as being rightmost on it, given that
    # order of visiting.
    seen = []  # @1
    look(root, 0, seen)  # @2
    return seen  # @3


def look(node, depth, seen):
    if node is None:  # @4
        return  # @4
    if depth == len(seen):  # @5
        seen.append(node.val)  # @5
    look(node.right, depth + 1, seen)  # @6
    look(node.left, depth + 1, seen)  # @7
