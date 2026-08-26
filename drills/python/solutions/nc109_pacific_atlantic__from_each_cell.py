from collections import deque


def pacificAtlantic(heights):
    if not heights or not heights[0]:
        return []

    rows, columns = len(heights), len(heights[0])

    # The direct reading: from each square, flow downhill and see which edges
    # are reachable. Correct, and it repeats nearly all of its work -- every
    # square on a shared downhill path re-explores the same route. Reversing the
    # question is what removes the repetition.
    def downhill(start):
        reached = set()
        frontier = deque([start])
        while frontier:
            r, c = frontier.popleft()
            if (r, c) in reached:
                continue
            reached.add((r, c))
            for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                if 0 <= nr < rows and 0 <= nc < columns:
                    if heights[nr][nc] <= heights[r][c]:
                        frontier.append((nr, nc))
        return reached

    out = []
    for r in range(rows):
        for c in range(columns):
            reached = downhill((r, c))
            if any(rr == 0 or cc == 0 for rr, cc in reached):
                if any(rr == rows - 1 or cc == columns - 1 for rr, cc in reached):
                    out.append((r, c))

    return sorted(out)
