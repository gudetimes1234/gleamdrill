class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def serialize(root):
    # Post-order instead of pre-order, still with a marker for every empty
    # child. The root is then the *last* token rather than the first, so the
    # reader works backwards -- and reading backwards means taking the right
    # subtree before the left. Worth writing once: the format is what decides
    # the parse direction, and nothing else about the two versions differs.
    parts = []
    write(root, parts)
    return ",".join(parts)


def write(node, parts):
    if node is None:
        parts.append("#")
        return
    write(node.left, parts)
    write(node.right, parts)
    parts.append(str(node.val))


def deserialize(data):
    return read(data.split(","), [len(data.split(",")) - 1])


def read(parts, at):
    token = parts[at[0]]
    at[0] -= 1
    if token == "#":
        return None
    node = TreeNode(int(token))
    node.right = read(parts, at)
    node.left = read(parts, at)
    return node
