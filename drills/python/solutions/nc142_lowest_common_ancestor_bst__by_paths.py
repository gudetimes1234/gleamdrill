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
    toP, toQ = path(root, p), path(root, q)  # @1
    best = -1  # @2
    for a, b in zip(toP, toQ):  # @3
        if a != b:  # @4
            break  # @4
        best = a  # @5
    return best  # @6


def path(node, target):
    if node is None:  # @7
        return []  # @7
    if node.val == target:  # @8
        return [node.val]  # @8
    for side in (node.left, node.right):  # @9
        found = path(side, target)  # @10
        if found:  # @11
            return [node.val] + found  # @11
    return []  # @12
