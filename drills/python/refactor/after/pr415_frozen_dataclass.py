from dataclasses import dataclass


@dataclass(frozen=True)
class Cell:
    row: int
    col: int
