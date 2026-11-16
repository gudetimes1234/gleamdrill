from collections import deque


def pacificAtlantic(heights):
    if not heights or not heights[0]:  # @1
        return []  # @1

    rows, columns = len(heights), len(heights[0])  # @2

    # Search *from* each ocean rather than from each cell. Asking "can this
    # square reach the sea?" means a fresh downhill search per square; asking
    # "which squares can the sea reach?" is two uphill searches in total, and
    # the answer is where they overlap.
    def uphill(starts):
        reached = set()  # @3
        frontier = deque(starts)  # @4
        while frontier:  # @5
            r, c = frontier.popleft()  # @6
            if (r, c) in reached:  # @7
                continue  # @7
            reached.add((r, c))  # @8
            for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):  # @9
                if 0 <= nr < rows and 0 <= nc < columns:  # @10
                    if heights[nr][nc] >= heights[r][c]:  # @11
                        frontier.append((nr, nc))  # @11
        return reached  # @12

    pacific = [(0, c) for c in range(columns)] + [(r, 0) for r in range(rows)]  # @13
    atlantic = [(rows - 1, c) for c in range(columns)] + [(r, columns - 1) for r in range(rows)]  # @14

    return sorted(uphill(pacific) & uphill(atlantic))  # @15
