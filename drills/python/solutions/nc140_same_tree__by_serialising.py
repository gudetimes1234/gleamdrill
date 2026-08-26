class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def isSameTree(p, q):
    # Turn each tree into a string and compare those. It works only because the
    # serialisation records the empty children too: without a marker for them,
    # different trees flatten to the same sequence -- the same trap Serialize
    # and Deserialize turns on.
    return serialise(p) == serialise(q)


def serialise(node):
    if node is None:
        return "#"
    return "(" + str(node.val) + serialise(node.left) + serialise(node.right) + ")"
