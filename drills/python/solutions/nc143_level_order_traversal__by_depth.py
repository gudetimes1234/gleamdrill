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
    levels = {}
    collect(root, 0, levels)
    return [levels[depth] for depth in range(len(levels))]


def collect(node, depth, levels):
    if node is None:
        return
    levels.setdefault(depth, []).append(node.val)
    collect(node.left, depth + 1, levels)
    collect(node.right, depth + 1, levels)
