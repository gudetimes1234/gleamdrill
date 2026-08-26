class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def invertTree(root):
    # Write the tree out pre-order with a marker for every empty child, then
    # read it back taking the first subtree as the *right* child. The inversion
    # happens entirely in the reading -- nothing is ever swapped. Longer than
    # the direct recursion, and worth having because the same flatten/rebuild
    # pair is all Serialize and Deserialize is.
    tokens = []
    flatten(root, tokens)
    return rebuild(tokens, [0])


def flatten(node, tokens):
    if node is None:
        tokens.append(None)
        return
    tokens.append(node.val)
    flatten(node.left, tokens)
    flatten(node.right, tokens)


def rebuild(tokens, at):
    value = tokens[at[0]]
    at[0] += 1
    if value is None:
        return None
    first = rebuild(tokens, at)
    second = rebuild(tokens, at)
    return TreeNode(value, second, first)
