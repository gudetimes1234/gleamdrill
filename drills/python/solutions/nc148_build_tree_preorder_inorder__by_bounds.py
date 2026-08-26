class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def buildTree(preorder, inorder):
    # The same construction without slicing anything: a map from value to its
    # in-order position, plus a low and a high bound saying which slice each
    # call owns. Building the map once turns the repeated search for the root --
    # the hidden O(n) inside the slicing version -- into a lookup.
    places = {value: i for i, value in enumerate(inorder)}
    return take(preorder, [0], places, 0, len(inorder) - 1)


def take(preorder, at, places, low, high):
    if low > high or at[0] >= len(preorder):
        return None
    root = preorder[at[0]]
    at[0] += 1
    split = places[root]
    return TreeNode(
        root,
        take(preorder, at, places, low, split - 1),
        take(preorder, at, places, split + 1, high),
    )
