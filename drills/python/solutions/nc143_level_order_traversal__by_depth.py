class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def levelOrder(root):
    # Walk depth-first and file each value under its depth. The traversal order
    # is wrong for the answer, but appending to the right bucket puts it right
    # -- and within a level, left is still visited before right, which is all
    # the ordering the answer needs. One dictionary instead of a frontier.
    levels = {}  # @1
    collect(root, 0, levels)  # @2
    return [levels[depth] for depth in range(len(levels))]  # @3


def collect(node, depth, levels):
    if node is None:  # @4
        return  # @4
    levels.setdefault(depth, []).append(node.val)  # @5
    collect(node.left, depth + 1, levels)  # @6
    collect(node.right, depth + 1, levels)  # @7
