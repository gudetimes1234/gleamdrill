def findWords(board, words):
    if not board or not board[0]:  # @1
        return []  # @1

    # One trie of all the words, walked *alongside* the board. Searching for
    # each word separately re-walks every shared prefix once per word; the trie
    # walks each prefix once and abandons a square the moment no word continues
    # that way, which is where nearly all the saving is.
    trie = {}  # @2
    for word in words:  # @3
        node = trie  # @4
        for letter in word:  # @5
            node = node.setdefault(letter, {})  # @6
        node["$"] = word  # @7

    found = set()  # @8

    def walk(r, c, node, used):
        if not (0 <= r < len(board) and 0 <= c < len(board[0])):  # @9
            return  # @9
        if (r, c) in used or board[r][c] not in node:  # @10
            return  # @10
        child = node[board[r][c]]  # @11
        if "$" in child:  # @12
            found.add(child["$"])  # @12
        used = used | {(r, c)}  # @13
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):  # @14
            walk(r + dr, c + dc, child, used)  # @15

    for r in range(len(board)):  # @16
        for c in range(len(board[0])):  # @16
            walk(r, c, trie, set())  # @17

    return list(found)  # @18
