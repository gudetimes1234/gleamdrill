try:
    (numIslands)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

def __board__(rows):
    return [list(row) for row in rows]

__case__("numIslands(one big island)", 1, numIslands(__board__(["11110", "11010", "11000", "00000"])))
__case__("numIslands(three islands)", 3, numIslands(__board__(["11000", "11000", "00100", "00011"])))
__case__("numIslands(all water)", 0, numIslands(__board__(["000", "000"])))
__case__("numIslands([])", 0, numIslands([]))
__case__("numIslands(diagonal squares are separate)", 2, numIslands(__board__(["10", "01"])))
