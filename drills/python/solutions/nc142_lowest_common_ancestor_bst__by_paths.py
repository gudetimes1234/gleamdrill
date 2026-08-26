class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def lowestCommonAncestor(root, p, q):
    # Find the path from the root to each target, then take the last node they
    # share. It ignores the ordering entirely, which is why it is the version
    # that also works on a plain binary tree -- at the cost of two searches and
    # two stored paths rather than one walk and nothing.
    toP, toQ = path(root, p), path(root, q)
    best = -1
    for a, b in zip(toP, toQ):
        if a != b:
            break
        best = a
    return best


def path(node, target):
    if node is None:
        return []
    if node.val == target:
        return [node.val]
    for side in (node.left, node.right):
        found = path(side, target)
        if found:
            return [node.val] + found
    return []
