class Cell:
    def __init__(self, row, col):
        self.row = row
        self.col = col

    def __eq__(self, other):
        return (self.row, self.col) == (other.row, other.col)

    def __hash__(self):
        return hash((self.row, self.col))

    def __repr__(self):
        return f"Cell(row={self.row!r}, col={self.col!r})"
