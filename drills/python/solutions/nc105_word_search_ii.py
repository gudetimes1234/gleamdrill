def findWords(board, words):
    if not board or not board[0]:
        return []

    # One trie of all the words, walked *alongside* the board. Searching for
    # each word separately re-walks every shared prefix once per word; the trie
    # walks each prefix once and abandons a square the moment no word continues
    # that way, which is where nearly all the saving is.
    trie = {}
    for word in words:
        node = trie
        for letter in word:
            node = node.setdefault(letter, {})
        node["$"] = word

    found = set()

    def walk(r, c, node, used):
        if not (0 <= r < len(board) and 0 <= c < len(board[0])):
            return
        if (r, c) in used or board[r][c] not in node:
            return
        child = node[board[r][c]]
        if "$" in child:
            found.add(child["$"])
        used = used | {(r, c)}
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            walk(r + dr, c + dc, child, used)

    for r in range(len(board)):
        for c in range(len(board[0])):
            walk(r, c, trie, set())

    return list(found)
