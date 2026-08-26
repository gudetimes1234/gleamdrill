from collections import deque


def pacificAtlantic(heights):
    if not heights or not heights[0]:
        return []

    rows, columns = len(heights), len(heights[0])

    # Search *from* each ocean rather than from each cell. Asking "can this
    # square reach the sea?" means a fresh downhill search per square; asking
    # "which squares can the sea reach?" is two uphill searches in total, and
    # the answer is where they overlap.
    def uphill(starts):
        reached = set()
        frontier = deque(starts)
        while frontier:
            r, c = frontier.popleft()
            if (r, c) in reached:
                continue
            reached.add((r, c))
            for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                if 0 <= nr < rows and 0 <= nc < columns:
                    if heights[nr][nc] >= heights[r][c]:
                        frontier.append((nr, nc))
        return reached

    pacific = [(0, c) for c in range(columns)] + [(r, 0) for r in range(rows)]
    atlantic = [(rows - 1, c) for c in range(columns)] + [(r, columns - 1) for r in range(rows)]

    return sorted(uphill(pacific) & uphill(atlantic))
